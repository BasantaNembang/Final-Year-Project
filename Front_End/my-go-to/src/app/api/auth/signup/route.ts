import API from "@/lib/axiosClient";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

interface backendResponse {
    msg?: string,
    flag?: boolean,
    httpStatus?: number
}



export async function POST(req: Request) {

    const form = await req.formData();

    console.log('form')
    console.log(form)
    try {
        let backendResponse = await API.post('/auth/signup', form)

        console.log('backendResponse')
        console.log(backendResponse)


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

    } catch (error: any) {


        console.log("error----------------")
        console.log(error)

        if (error instanceof AxiosError) {
            const response = error.response?.data as backendResponse;
            return NextResponse.json({
                message: response.msg,
                bool: response.flag,
                httpStatus: response.httpStatus
            }, {
                status: response.httpStatus
            })
        } else {
            return NextResponse.json({
                message: "some thing went wrong",
                bool: false,
                httpStatus: 500
            }, {
                status: 500
            })
        }



    }



}



