import { CartRequest } from "@/types/cartData";
import axios, { AxiosError } from "axios";

export const Api = axios.create({
    baseURL: "http://localhost:9090",
});


interface backendResponse {
    msg?: string,
    flag?: boolean,
    httpStatus?: number
}

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
    try {
        const token = await axios.get(`/api/auth/getToken`);
        return token.data;
    } catch (error) {
        console.error(error)
    }
}


//get course-By id for Payment-Service
export async function getCourseById(courseId: string) {
    try {
        const response = await Api.get(`/course/get/` + courseId);
        return response.data;
    } catch (err: any) {
        throw new Error(err);
    }
}



//for cart section
export async function saveCart(saveCart: CartRequest) {
    try {
        await axios.post(`/api/backend/cart/save`, saveCart);
        return true;
    } catch (err: any) {
        const error = err as AxiosError;
        const errorResponse = error.response?.data as backendResponse;
        if (errorResponse.msg === "Already added to cart") {
            return errorResponse.msg;
        } else {
            throw new Error(err);
        }
    }
}


//for cart section
export async function getCartItems(studentId: string) {
    try {
        const response = await axios.get(`/api/backend/cart/get/`+ studentId);
        return response.data;
    } catch (err: any) {
        throw new Error(err);
    }
}



//for cart section
export async function deleteCartItem(cartId: string) {
    try {
        const response = await axios.delete(`/api/backend/cart/delete/`+ cartId);
        return response.data;
    } catch (err: any) {

        console.log(err)
    }
}

