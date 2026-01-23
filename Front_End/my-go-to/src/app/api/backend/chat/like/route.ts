import API from "@/lib/axiosClient";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const roomId = searchParams.get("roomId")
    const mId = searchParams.get("mId")
    const sMId = searchParams.get("sMId")
    const userId = searchParams.get("userId")
    
    try {
        const response = await axios.post(`http://localhost:8090/room/like?roomId=${roomId}&mId=${mId}&sMId=${sMId}&userId=${userId}`)
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

