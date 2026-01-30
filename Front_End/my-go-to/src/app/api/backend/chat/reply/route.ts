import API from "@/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const roomId = searchParams.get("roomId")
    const mId = searchParams.get("mId")

    const jwt = 'jwtToken';
    const jwtToken = req.cookies.get(jwt)?.value

    try {
        const response = await API.get(`/room/messages?roomId=${roomId}&mId=${mId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
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

