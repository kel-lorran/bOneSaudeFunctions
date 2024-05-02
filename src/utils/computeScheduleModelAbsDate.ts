import moment from "moment"
import { FlowStep } from "../model/FlowStep"

module.exports = (scheduleModelWithoutAbsDate: FlowStep[], dum: number): FlowStep[] => {
    return scheduleModelWithoutAbsDate.map(flowStep => ({
        ...flowStep,
        date: (moment(dum).startOf('day').add(17, 'hour').unix() * 1000) + flowStep.dateRelative
    }))
}