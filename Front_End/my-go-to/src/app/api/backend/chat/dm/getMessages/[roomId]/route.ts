import API from "@/lib/axiosClient";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";


interface backendResponse {
    msg?: string,
    flag?: boolean,
    httpStatus?: number
}


export async function GET(req: NextRequest, context: any) {

    const { searchParams } = new URL(req.url);
    const { roomId } = await context.params;

    const studentId = searchParams.get("studentId")
    
    const JWT = "jwtToken"

    const jwtToken = req.cookies.get(JWT)?.value;

    try {
        const response = await API.get(`/room/dm-messages/student/${roomId}?studentId=${studentId}`,
            {
                headers : {
                    Authorization : `Bearer ${jwtToken}`
                }
            }
        )
        return NextResponse.json({
            msg: "success",
            data: response.data
        })
    } catch (error: any) {
        if (error instanceof AxiosError) {
            const response = error.response?.data as backendResponse
            if (response.msg === "No such user found") {
                return NextResponse.json({
                    msg: "no conversation till",
                    data: []
                }, { status: 200 })
            }
            else {
                return NextResponse.json({
                    msg: "some thing went wrong  ",
                }, { status: 500 })
            }
        }
    }

}

