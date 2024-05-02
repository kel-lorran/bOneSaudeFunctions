var admin = require("firebase-admin");
var Chance = require("chance");
var chance = new Chance();

var serviceAccount = require("../utils/cert/credential.json");

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
}

(async (patientQtd = 10) => {
  var crypto = require('crypto')
  const dataSIS = Array(patientQtd)
    .fill(undefined)
    .map(() => {
      const data = {
        CPF: chance.cpf().replace(/\D/gi, ""),
        DUM:
         ( new Date().getTime() -
          chance.integer({
            min: 1000 * 60 * 60 * 24 * 30,
            max: 1000 * 60 * 60 * 24 * 30 * 12,
          })).toString(),
      }
      
      return {
        ...data,
        snapshot: crypto.createHash('md5').update(JSON.stringify(data)).digest('hex')
      } 
    });
    
  return Promise.all(
    dataSIS.map((e) =>
      admin.firestore().collection("sis").doc(e.CPF).set(Object.assign({}, e))
    )
  );
})();