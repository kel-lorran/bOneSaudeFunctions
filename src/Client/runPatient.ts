import { SISPatient } from "../model/SISPatient"

const dataFromBackup = require('../PreProcessing/patientSISData.draft.json');

(async () => {
    const createPatient = require('./createPatient')
    createPatient(dataFromBackup.map(({CPF, DUM}: SISPatient) => ({cpf: CPF, dum: +DUM})))
})()