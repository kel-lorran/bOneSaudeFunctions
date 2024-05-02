import { SISPatient } from "../model/SISPatient"

const dataFromBackup = require('../../backup.json');

(async () => {
    const createPatient = require('./createPatient')
    createPatient(Object.values(dataFromBackup['__collections__'].sis as SISPatient[]).map(({CPF, DUM}) => ({cpf: CPF, dum: +DUM})))
})()