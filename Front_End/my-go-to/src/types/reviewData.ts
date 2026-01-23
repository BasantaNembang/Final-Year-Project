
export interface ReviewData {
    rating: number,
    message: string,
    courseId: string,
    userId: string
}


export interface ReviewDataResponse {
    rid: number,
    message: string,
    courseId: string,
    userName: string,
    time: string,
    rating: number
}
