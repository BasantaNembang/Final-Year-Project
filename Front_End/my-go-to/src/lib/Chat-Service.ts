
import axios from "axios";


//create room for disscussion
export async function createDisscussionRoom(roomId: string) {
    let response = null;
    try {
        response = await axios.post(`/api/backend/chat/disscuss/create/${roomId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        throw new Error("can`t do communications");
    }
}

export async function createDmRoom(dmRoomId: string) {
    let response = null;
    try {
        response = await axios.post(`/api/backend/chat/dm/create/${dmRoomId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        throw new Error("Error while creating room for DMS");
    }
}



export async function getALlDisscussionMessage(roomId: string, page: number, size: number) {
    let response = null;
    try {
        response = await axios.get(`/api/backend/chat/disscuss/${roomId}?page=${page}&size=${size}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        console.error(err)
    }
}

export async function getALlReplyDisscssMessage(IDs: string[]) {
    let response = null;
    try {
        response = await axios.get(`/api/backend/chat/reply/?roomId=${IDs[0]}&mId=${IDs[1]}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        console.error(err)
    }
}


//to connected
export async function isConnected(roomId: string) {
    let response = null;
    try {
        response = await axios.get(`/api/backend/chat/isConnected/${roomId}`);
        if (response.status === 200) {
            return true;
        }
    } catch (err) {
        throw new Error("Please check course_ID")
    }
}


//to connected
export async function isConnectedDM(dmRoomId: string) {
    let response = null;
    try {
        response = await axios.get(`/api/backend/chat/isConnectedDM/${dmRoomId}`);
        if (response.status === 200) {
            return true;
        }
    } catch (err) {
        throw new Error("Please check dmRoomId")
    }
}


//for like
export async function LikeLIb(roomId: string, mId: string, sMId: string, userId: string) {
    try {
        let response = await axios.post(`/api/backend/chat/like?roomId=${roomId}&mId=${mId}&sMId=${sMId}&userId=${userId}`);
        if (response.status === 200) {
            return true;
        }
    } catch (err) {
        throw new Error("Error in Liking the post")
    }
}


//for dm messages
export async function getAllDmMessagesSTD(roomId: string, studentId: string) {
    let response = null;
    try {
        response = await axios.get(`/api/backend/chat/dm/getMessages/${roomId}?studentId=${studentId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        console.error(err)
    }
}


//for dm messages
export async function getAllDmMessagesTeacher(teacherId: string) {
    try {
       const response = await axios.get(`/api/backend/chat/dm/getMessagesTeacher/${teacherId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        console.error(err)
    }
}
