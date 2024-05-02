import { FlowStep } from "../model/FlowStep";
import { Patient } from "../model/Patient";
import { Post } from "../model/Post";

var admin = require("firebase-admin");
var serviceAccount = require("../utils/cert/credential.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = async () => {
  //get all PatientList
  const patientList = (
    await admin.firestore().collection("patient").doc().get()
  ).data();

  patientList.map(async (patient: Patient) => {
    let hasChange = false;
    await patient.scheduleModelRefList.map(async (scheduleModelRef) => {
      const flowScheduleModel: FlowStep[] = (
        await admin
          .firestore()
          .collection("patientFlowScheduleModel")
          .doc(scheduleModelRef)
          .get()
      ).data();

      const temptempflowScheduleModel = flowScheduleModel.map(async (e) => {
        const now = new Date().getTime();
        if (e.date < now) {
          if (patient.appTokenList?.length) {
            const postData: Post = (
              await admin.firestore().collection("post").doc(e.postRef).get()
            ).data();

            await admin.messaging().send({
              notification: {
                title: postData.title,
                body: postData.content,
              },
              data: { nothing: true },
              tokens: patient.appTokenList,
            });
            e.status = "sended";
          } else {
            e.status = "expired";
          }
          hasChange = true;
        }
        return e;
      });
      if (hasChange) {
        return admin
          .firestore()
          .collection("patientFlowScheduleModel")
          .doc(scheduleModelRef)
          .set(temptempflowScheduleModel)
      }
    });
  });
};
