var admin = require("firebase-admin");
var Chance = require("chance");
var chance = new Chance();

var serviceAccount = require("../utils/cert/b-one-saude-firebase-adminsdk-8vmnq-227fedd0ff.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

(async (patientQtd = 100) => {
  const dataSIS = Array(patientQtd)
    .fill(undefined)
    .map(() => ({
      CPF: chance.cpf().replace(/\D/gi, ""),
      DOM:
       ( new Date().getTime() -
        chance.integer({
          min: 1000 * 60 * 60 * 24 * 30,
          max: 1000 * 60 * 60 * 24 * 30 * 12,
        })).toString(),
    }));
    
  return Promise.all(
    dataSIS.map((e) =>
      admin.firestore().collection("sis").doc(e.CPF).set(Object.assign({}, e))
    )
  );
})();