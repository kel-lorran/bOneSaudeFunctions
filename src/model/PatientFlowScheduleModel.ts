import { FlowStep } from "./FlowStep";

export interface PatientFlowScheduleModel {
    ID?: string,
    flowRef?: string,
    data: FlowStep[]
}