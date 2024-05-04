import { Patient } from "../model/Patient";
import { PatientFlowScheduleModel } from "../model/PatientFlowScheduleModel";
import { Post } from "../model/Post";

var admin = require("firebase-admin");
var serviceAccount = require("../utils/cert/credential.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

(async () => {
  //get all PatientList
  const patientList = (
    await admin.firestore().collection("patient").get()
  ).docs.map((e: any) => e.data());

  patientList.map(async (patient: Patient) => {
    let hasChange = false;
    await patient.scheduleModelRefList.map(async (scheduleModelRef) => {
      const flowScheduleModel: PatientFlowScheduleModel = (
        await admin
          .firestore()
          .collection("patientFlowScheduleModel")
          .doc(scheduleModelRef)
          .get()
      ).data();

      const newFlowScheduleModelData = await Promise.all(flowScheduleModel.data.map(async (e) => {
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
      }));
      if (hasChange) {
        return admin
          .firestore()
          .collection("patientFlowScheduleModel")
          .doc(scheduleModelRef)
          .set({ data: newFlowScheduleModelData }, { merge: true })
      }
    });
  });
})();
