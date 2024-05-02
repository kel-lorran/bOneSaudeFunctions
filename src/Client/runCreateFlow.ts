import { SISPatient } from "../model/SISPatient"

var flowDataExample = require('./flowDataExample.json');

(async () => {
    const createFlow = require('./createFlow')
    createFlow(flowDataExample)
})()
