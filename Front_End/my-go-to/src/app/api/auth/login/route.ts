import API from "@/lib/axiosClient";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

interface backendResponse {
    msg?: string,
    flag?: boolean,
    httpStatus?: number
}

export async function POST(req: Request) {

    const data = await req.json();

    let api_response = null;
    try {
        api_response = await API.post('/auth/login', data);
        const res = NextResponse.json({
            message: "user logIn successfully",
            bool: true,
            httpStatus: 200
        })

        res.cookies.set('jwtToken', api_response.data.jwtToken, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        })

        res.cookies.set('refreshToken', api_response.data.refreshToken, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 6,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        })

        res.cookies.set('userId', api_response.data.userId, {
            maxAge: 60 * 60 * 6,
        })

        return res;
    } catch (error: any) {
        console.log(error.response.data)
        if (error instanceof AxiosError) {
            const response = error.response?.data as backendResponse
            return NextResponse.json(
                {
                    message: response.msg,
                    bool: response.flag,
                    httpStatus: response.httpStatus
                }, {
                status: response.httpStatus
            }
            );
        }
        else {
            return NextResponse.json(
                {
                    message: "Some thing went wrong",
                    bool: false,
                    httpStatus: 500
                }, {
                status: 500
            }
            );
        }
    }
}

