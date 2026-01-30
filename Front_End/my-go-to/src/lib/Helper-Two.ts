import axios, { AxiosError } from "axios";

export const Api = axios.create({
    baseURL: "http://localhost:9090",
});


//get the all the course reviews
export async function getALlCourseReview(courseId: string) {
    let response = null;
    try {
        response = await Api.get(`/review/get/${courseId}`);
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


//get the jwtToken
export async function getJwtToken() {
    try{
    const token = await axios.get(`/api/auth/getToken`);
    return token.data;
    }catch(error){
        console.error(error)
    }
    
}


