import { FlowStep } from "../model/FlowStep";
import { Post } from "../model/Post";
var transformStepListToScheduleModel = require('../utils/transformStepListToScheduleModel')

var admin = require("firebase-admin");
var createPost = require('./createPost')

var serviceAccount = require("../utils/cert/credential.json");

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = async (flowData: any) => {
    const temp = admin
    .firestore()
    .collection("flow")
    .doc()

    const {
        name,
        segment,
        startCondition,
        stepList
    } = flowData

    const computedStepList = await Promise.all(stepList.map(async ({ postRef, post, ...restStep }: FlowStep) => {
        return {
            ...restStep,
            postRef: await createPost([post]).then((e: Post[]) => e[0].ID)
        }
    }))

    const scheduleModelTemp = transformStepListToScheduleModel(computedStepList, startCondition)

    const scheduleModelDoc = admin
    .firestore()
    .collection("scheduleModel")
    .doc()

    const scheduleModel = {
        ID: scheduleModelDoc.id,
        data: scheduleModelTemp
    }

    await scheduleModelDoc.set(scheduleModel)

    return temp.set({
        ID: temp.id,
        name,
        segment,
        startCondition,
        stepList: computedStepList,
        scheduleModel
    })
}
