import { LoginDetails } from "@/types/usersData";
import axios, { AxiosError } from "axios";

export const Api = axios.create({
    baseURL: "http://localhost:9090/auth",
});


//for refresh Token
export async function getTokenViaRereshToken(refreshToken: string) {
    let response = null;
    try {
        response = await Api.post('/refresh_token', { refreshToken: refreshToken }, { headers: { "Content-Type": "application/json" } })
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        const error = err as AxiosError
        return error.response;
    }


}


// TEACHER
export async function signUpTeacher(formData: FormData) {
    console.log(formData)
    let response = null;
    try {
        response = await Api.post('/signup', formData, { headers: { "Content-Type": "multipart/form-data" } })
        console.log(response)
        if (response.status === 200) {
            return response;
        }

    } catch (err) {
        const error = err as AxiosError
        console.error(error);
        return error.response?.data;
    }


}


export async function loginTeacherBackend(loginDetails: LoginDetails) {
    console.log(loginDetails)
    let response = null;
    try {

    } catch (err) {
        const error = err as AxiosError
        console.error(error);
        return error.response?.data;
    }


}



// STUDENT
export async function signUpStudentBackend(formData: FormData) {
    let response = null;
    try {
        response = await Api.post('/signup', formData, { headers: { "Content-Type": "multipart/form-data" } } )
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        const error = err as AxiosError
        console.log("object")
        console.log(error?.response?.data)
        return error?.response?.data;
    }
}
//httpStatus


export async function loginStudentBackend(loginDetails: LoginDetails) {
    console.log(loginDetails)
    let response = null;
    try {

    } catch (err) {
        const error = err as AxiosError
        console.error(error);
        return error.response?.data;
    }


}
