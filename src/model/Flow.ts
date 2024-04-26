import { FlowStep } from "./FlowStep"
import { Post } from "./Post"
import { Step } from "./Step"

export interface Flow {
    ID?: string,
    name: string,
    segment: string,
    startCondition: {
        type: string
        unit: string
        value: number
    }
    stepList: Step[]
    scheduleModel: FlowStep[]
}