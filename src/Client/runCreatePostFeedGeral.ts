import { Post } from "../model/Post"

const postDataExampleForAll: Post[] = require('./postDataExampleForAll.json');

(async () => {
    const createPost = require('./createPost')
    createPost(postDataExampleForAll)
})()