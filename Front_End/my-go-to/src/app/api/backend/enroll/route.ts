import API from "@/lib/axiosClient";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";


interface backendResponse {
    enrollID?: string,
    msg?: string
}


export async function POST(req: NextRequest) {

    const paymentForm = await req.json()

    const jwt = 'jwtToken';

    const jwtToken = req.cookies.get(jwt)?.value


    try {
        const response = await API.post("/enroll/course", paymentForm,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            });

        return NextResponse.json({
            enrollID: response.data.enrollID,
            msg: response.data.msg,
        })

    } catch (error: any) {

        if (error instanceof AxiosError) {
            const response = error.response?.data as backendResponse;
            return NextResponse.json({
                enrollID: response.enrollID,
                msg: response.msg
            }
            )
        }

    }


}

