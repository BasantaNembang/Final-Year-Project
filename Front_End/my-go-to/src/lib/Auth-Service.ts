import axios, { AxiosError } from "axios";

export const Api = axios.create({
    baseURL: "http://localhost:9090/auth",
});


//get the teacher INFO
export async function getTeacherDetails(userId: string) {
    let response = null;
    try {
        response = await Api.get(`/get-info/${userId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
        }

    } catch (error) {
        if (error instanceof AxiosError) {
            console.error(error)
            return error.response?.data;
        } else {
            throw new Error(String(error));
        }
    }
}


//get the username by ID
export async function getUserNameByID(userId: string) {
    let response = null;
    try {
        response = await Api.get(`/user/${userId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error(error)
            return error.response?.data;
        } else {
            throw new Error(String(error));
        }
    }
}



//get the email by ID
export async function getEmailByID(userId: string) {
    let response = null;
    try {
        response = await Api.get(`/user/email/${userId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error(error)
            return error.response?.data;
        } else {
            throw new Error(String(error));
        }
    }
}

