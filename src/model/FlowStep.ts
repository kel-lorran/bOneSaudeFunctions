import { Post } from "./Post"

export interface FlowStep {
    ID?: string
    status: string
    date: number
    dateRelative: number
    postRef: string
    post?: Post
}