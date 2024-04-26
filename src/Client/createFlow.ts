import { Post } from "../model/Post";

var admin = require("firebase-admin");
var createPost = require('./createPost')

var serviceAccount = require("../utils/cert/b-one-saude-firebase-adminsdk-8vmnq-227fedd0ff.json");
var flowDataExample = require("./flowDataExample.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const fn = async () => {
    const temp = admin
    .firestore()
    .collection("flow")
    .doc()

    const {
        name,
        segment,
        startCondition,
        stepList
    } = flowDataExample

    const computedStepList = await Promise.all(stepList.map(async ({ postRef, post, ...restStep }) => {
        return {
            ...restStep,
            postRef: await createPost([post]).then((e: Post[]) => e[0].ID)
        }
    }))

    return temp.set({
        ID: temp.id,
        name,
        segment,
        startCondition,
        stepList: computedStepList,
        scheduleModel: null
    })
}

module.exports = fn