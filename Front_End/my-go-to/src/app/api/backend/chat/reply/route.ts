import API from "@/lib/axiosClient";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const roomId = searchParams.get("roomId")
    const mId = searchParams.get("mId")

    try {
        const response = await axios.get(`http://localhost:8090/room/messages?roomId=${roomId}&mId=${mId}`)
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

