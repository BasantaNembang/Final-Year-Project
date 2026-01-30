import API from "@/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: any) {

    const { dmRoomId } = await context.params;

    const jwt = 'jwtToken';

    const jwtToken = req.cookies.get(jwt)?.value;


    try {
        const response = await API.post(`/room/dm-create/${dmRoomId}`, {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            }
        )
        return NextResponse.json({
            msg: "success",
            data: response.data
        })

    } catch (error: any) {
        console.log("error")
        console.error(error)

        return NextResponse.json({
            msg: "some thing went wrong",
        }, { status: 500 })

    }

}

