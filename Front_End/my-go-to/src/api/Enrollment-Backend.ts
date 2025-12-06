import { PaymentDTO } from "@/types/enrollmentData";
import axios, { AxiosError } from "axios";

export const Api = axios.create({
    baseURL: "http://localhost:9090/enroll",
});


export async function enrollCourse(paymentForm: PaymentDTO) {
    console.log(paymentForm)
    let response = null;
    try {
     response = await Api.post("/course", paymentForm, {  headers: {"Content-Type": "application/json"}  });
     console.log(response)
    return response.data;
    } catch (err) {
        const error =  err as AxiosError
        console.error(error);
        return error.response?.data;
    }


}
