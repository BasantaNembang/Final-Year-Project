import API from "@/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const jwt = 'jwtToken';
    const jwtToken = req.cookies.get(jwt)?.value

    const roomId = searchParams.get("roomId")
    const mId = searchParams.get("mId")
    const sMId = searchParams.get("sMId")
    const userId = searchParams.get("userId")

    try {
        const response = await API.post(`/room/like?roomId=${roomId}&mId=${mId}&sMId=${sMId}&userId=${userId}`,
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

