import { PatientFlowScheduleModel } from "./PatientFlowScheduleModel"

export interface Patient {
    ID?: string
    cpf: string
    email: string
    dum?: number
    appTokenList: string[]
    scheduleModelRefList: string[]
    scheduleModelList?: PatientFlowScheduleModel[]
}