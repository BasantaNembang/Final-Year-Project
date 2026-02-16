import API from "@/lib/axiosClient";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

interface backendResponse {
    msg?: string,
    flag?: boolean,
    httpStatus?: number
}


export async function POST(req: Request) {

    const form = await req.formData();

    try {
        const backendResponse = await API.post('/auth/signup', form, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        const res = NextResponse.json({
            message: "SignUP successfully",
            bool: true,
            httpStatus: 200
        });


        res.cookies.set("jwtToken", backendResponse.data.jwtToken, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60, //second -> 1hrs
            sameSite: 'lax'
        })

        res.cookies.set("refreshToken", backendResponse.data.refreshToken, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 6,
            sameSite: 'lax'
        })

        res.cookies.set('userId', backendResponse.data.userId, {
            maxAge: 60 * 60 * 6,
        })


        return res;

    }

    catch (error: any) {
        console.log("error----------------", error);

        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Backend responded with error status
                console.log("inside of if......................");
                console.log(error.response?.data);
                const responseData = error.response?.data as backendResponse || {};
                return NextResponse.json({
                    message: responseData.msg || "Backend error",
                    bool: responseData.flag ?? false,
                    httpStatus: responseData.httpStatus || 500
                }, { status: error.response.status || 500 });
            } else {
                // No response — network/connection issue
                console.log("No response from backend (e.g., ECONNREFUSED):", error.message);
                return NextResponse.json({
                    message: "Backend service unreachable - check connection",
                    bool: false,
                    httpStatus: 502
                }, { status: 502 });
            }
        } else {
            return NextResponse.json({
                message: "Unexpected error",
                bool: false,
                httpStatus: 500
            }, { status: 500 });
        }
    }

}

