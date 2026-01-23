import API from "@/lib/axiosClient";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";


export interface backendResponse {
    msg?: string,
    flag?: boolean,
    httpStatus?: number
}

export async function POST(req: NextRequest) {
    const formData = await req.formData()

    const jwt = 'jwtToken';

    const jwtToken = req.cookies.get(jwt)?.value


    try {
        const response = await API.post("/course/save", formData,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
        return NextResponse.json({
            msg: "success",
            data: response.data
        })

    } catch (error: any) {

        console.log('error')
        console.log(error)
        if (error instanceof AxiosError) {
            if (error.status === 403) {
                return NextResponse.json({
                    msg: error.response?.data.message,
                    bool: false,
                    httpStatus: 403
                }, { status: 403 })
            } else {
                let respose = error.response?.data as backendResponse;
                return NextResponse.json({
                    message: respose.msg,
                    bool: respose.httpStatus,
                    httpStatus: respose.httpStatus
                }, { status: 500 })
            }
        }
    }
}

