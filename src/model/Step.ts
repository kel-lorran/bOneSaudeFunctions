import { Time } from "./Time"

export interface Step {
    ID?: string
    interval: Time
    duration: Time
    postRef: string
}