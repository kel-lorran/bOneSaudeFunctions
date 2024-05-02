import { PatientFlowScheduleModel } from "./PatientFlowScheduleModel"
import { Step } from "./Step"
import { Time } from "./Time"

export interface Flow {
    ID?: string,
    name: string,
    segment: string,
    startCondition: Time
    stepList: Step[]
    scheduleModel: PatientFlowScheduleModel
}

