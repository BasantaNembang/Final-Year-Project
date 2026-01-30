
export interface Disscuss {
    sender: string,
    content: string
}

export interface DisscussDM {
    courseId: string,
    content: string,
    teacherId: string,
    studentId: string,
    username: string,
    courseName: string
}


export interface Messages {
    sender: string,
    content: string,
    time: string
    mid: string
    subMessages: SubMessage[]
}

export interface SubMessage {
    sender: string,
    content: string,
    time: string,
    smid: string,
    userId: string[]
}


export interface LikeResponse {
    subId: string,
    userId: string[]
}


//for dm
export interface TeacherDmMSG {
    id: string,
    roomId: string,
    teacherId: string,
    dmMessages: dmMessages[]
}

export interface dmMessages {
    mid: string,
    studentId: string,
    courseName: string,
    subMessages: DmSubMessages[]
}

export interface DmSubMessages {
    id: string,
    username: string,
    content: string
    time: string
}

