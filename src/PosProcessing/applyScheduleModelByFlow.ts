import { Flow } from "../model/Flow";
import { Patient } from "../model/Patient";
var admin = require("firebase-admin");
var serviceAccount = require("../utils/cert/credential.json");
var computeScheduleModelAbsDate = require('../utils/computeScheduleModelAbsDate')

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const fn = async (flowId: string) => {
    //get flow by ID
    const flowData: Flow = (await admin
        .firestore()
        .collection("flow")
        .doc(flowId)
        .get())
        .data()

    //get CPFList by Flow.segment
    const cpfTargetList: string[] = (await admin
        .firestore()
        .collection("segmentedPatients")
        .doc(flowData.segment)
        .get())
        .data()
        .data
    //get PatientList by CPF
    const patientTargetList = await Promise.all(cpfTargetList.map(async (cpf) => {
        return (await admin
            .firestore()
            .collection('patient')
            .doc(cpf)
            .get())
            .data()
    }))
    //apply/copy scheduleModelRef to Patient
    return Promise.all(
        patientTargetList.map(async (patient: Patient) => {
            const snapPatientFlowScheduleModel = admin
                .firestore()
                .collection('patientFlowScheduleModel')
                .doc()

            const patientFlowScheduleModelData = {
                ID: snapPatientFlowScheduleModel.id,
                flowRef: flowData.ID,
                data: computeScheduleModelAbsDate(flowData.scheduleModel.data, patient.dum),
            }
            
            await snapPatientFlowScheduleModel.set(patientFlowScheduleModelData)
            return admin
                .firestore()
                .collection('patient')
                .doc(patient.ID)
                .set({ scheduleModelRefList: [...patient.scheduleModelRefList, patientFlowScheduleModelData.ID] }, { merge: true })
        })
    )
}

module.exports = fn