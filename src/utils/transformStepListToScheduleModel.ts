import moment, { duration } from "moment";
import { Step } from "../model/Step";
import { Time } from "../model/Time";
import { FlowStep } from "../model/FlowStep";

module.exports = (stepList: Step[], startCondition: Time): FlowStep[] => {
    const initialIncrement = moment(0).add(startCondition.value, startCondition.unit as any)
    let absIncrement = initialIncrement

    return stepList.map(step => {
        const qtdRepeat = Math.ceil(step.duration.value / step.interval.value)
        return Array(qtdRepeat).fill(undefined).map((_, i, a) => {
            const isLastItem = i + 1 === a.length
            const dateRelativeRaw = moment(absIncrement).add(isLastItem ? step.duration.value : (step.interval.value * (i + 1)), 'week')
            if(isLastItem) {
                absIncrement = dateRelativeRaw
            }
            return {
                postRef: step.postRef,
                status: 'initial',
                date: 0,
                dateRelative: dateRelativeRaw.unix() * 1000
            }
        })
    }).flat()
}