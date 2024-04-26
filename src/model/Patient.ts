import { PatientFlowScheduleModel } from "./PatientFlowScheduleModel"
import { FlowStep } from "./FlowStep"

export interface Patient {
    ID?: string
    appTokenList: string[]
    PatientFlowScheduleModelRef: string[]
    flowScheduleModel?: PatientFlowScheduleModel
    scheduleModellIST: FlowStep[][]
}