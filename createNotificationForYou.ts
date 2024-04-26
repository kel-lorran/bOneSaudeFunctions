// const _main = async () => {
//     let patientList = []

//     const snap1 = await admin
//     .firestore()
//     .collection("patient")
//     .where("cpf", "!=", null)
//     .get();
//   if (snap1.size) {
    
//     patientList = snap1.docs.map((e: any) => e.data());
    
//   }
//   const snap = await admin
//     .firestore()
//     .collection("flow")
//     .where("stepList", "!=", null)
//     .get();
//   if (snap.size) {
    
//     const result = snap.docs.map((e: any) => e.data().stepList).flat();

//     patientList.map((e:any) => {
//         if(Math.random() > 0.5) {
//             const chonseStep = result[(Math.random() * result.length).toFixed(0)]

//             admin
//             .firestore()
//             .collection("notificationForYou")
//             .doc(e.cpf)
//             .set(chonseStep)

//             if(e.tokens?.length) {
//                 admin.messaging().send({
//                     notification: {
//                         title: chonseStep.title,
//                         body: chonseStep.content,
//                     },
//                     data: {nothing: true},
//                     tokens: e.tokens
//                 })
//             }
//         }
//     })
//   }
// };

// _main();
