import { Post } from "../model/Post";

var admin = require("firebase-admin");

var serviceAccount = require("../utils/cert/credential.json");

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
}



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