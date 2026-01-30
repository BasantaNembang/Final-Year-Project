import API from "@/lib/axiosClient";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, context: any) {

    const { teacherId } = await context.params;
    const jwt = 'jwtToken';

    const jwtToken = req.cookies.get(jwt)?.value

    try {
        const response = await API.get(`/room/dm-messages/teacher/${teacherId}`,
            {
                headers : {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        )
        return NextResponse.json({
            msg: "success",
            data: response.data
        })

    } catch (error: any) {
        console.error(error)

        return NextResponse.json({
            msg: "some thing went wrong",
        }, { status: 500 })

    }

}

