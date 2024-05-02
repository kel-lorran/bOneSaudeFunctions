import { Patient } from "../model/Patient";
var admin = require("firebase-admin");
var Chance = require("chance");
var chance = new Chance();

var serviceAccount = require("../utils/cert/credential.json");

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = (patientList: Partial<Patient>[], patientQtd = 100) => {
    const _patientList = (patientList || Array(patientQtd)
        .fill(undefined))
        .map((e = {}) => ({
            cpf: chance.cpf().replace(/\D/gi, ""),
            email: chance.email(),
            appTokenList: [],
            scheduleModelRefList: [],
            scheduleModelList: [],
            ...e
        }));
    
    return Promise.all(_patientList.map(async (e: Patient) => {
        const patientDoc = admin
            .firestore()
            .collection("patient")
            .doc(e.cpf)

        const patient = {
            ...e,
            ID: patientDoc.id
        }
        await patientDoc.set(patient)
        return patient
    }))
}
