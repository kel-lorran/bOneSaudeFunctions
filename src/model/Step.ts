export interface Step {
    ID?: string,
    interval: {
        unit: string,
        value: number
    },
    duration: {
        unit: string,
        value: number
    }
    postRef: string
}