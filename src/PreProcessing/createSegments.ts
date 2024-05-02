import { SISPatient } from "../model/SISPatient";

var admin = require("firebase-admin");
var Chance = require("chance");
var chance = new Chance();

var serviceAccount = require("../utils/cert/credential.json");

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
}

(async () => {
  const segmentList = [
    {
      name: "prenatal",
      query: ({ DUM = 0 }) => {
        const now = new Date().getTime();
        if (DUM) {
          return (now - DUM) < 1000 * 60 * 60 * 24 * 7 * 42;
        }
      },
    },
    {
      name: "postChildbirth",
      query: ({ DUM = 0 }) => {
        const now = new Date().getTime();
        if (DUM) {
          const period = now - DUM;
          return (
            period > 1000 * 60 * 60 * 24 * 7 * 42 &&
            period < 1000 * 60 * 60 * 24 * 7 * (42 + 28)
          );
        }
      },
    },
  ];

  const snapshot = await admin.firestore().collection('sis').get()
  if (snapshot.size) {
    const result = snapshot.docs.map((e: any) => e.data());
    return Promise.all(
      segmentList.map((e) =>
        admin
          .firestore()
          .collection("segmentedPatients")
          .doc(e.name)
          .set({ data: result.filter(e.query).map((e: SISPatient) => e.CPF) })
      )
    );
  }
})()