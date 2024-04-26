import { Post } from "../model/Post";

var admin = require("firebase-admin");
var Chance = require("chance");
var chance = new Chance();

var serviceAccount = require("../utils/cert/b-one-saude-firebase-adminsdk-8vmnq-227fedd0ff.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});



const fn = (postList: Post[]) => {
    return Promise.all(
        postList.map(async (e) => {
            const temp = admin
            .firestore()
            .collection("post")
            .doc()
            const data = {
                ...e,
                ID: temp.id
            }
            await temp.set(data)
            return data
        })
    )
}

module.exports = fn