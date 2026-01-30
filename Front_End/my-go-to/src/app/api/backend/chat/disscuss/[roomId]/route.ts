import API from "@/lib/axiosClient";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {

    const { roomId } = await context.params;
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page")
    const size = searchParams.get("size")

    const jwt = 'jwtToken';

    const jwtToken = req.cookies.get(jwt)?.value

    try {
        const response = await API.get(`/room/messages/${roomId}?page=${page}&size=${size}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        return NextResponse.json({
            msg: "success",
            data: response.data
        })

    } catch (error: any) {
        console.log(error)
        console.log(error.data)
        return NextResponse.json({
            msg: "something went wrong",
        }, { status: 500 })

    }
}

