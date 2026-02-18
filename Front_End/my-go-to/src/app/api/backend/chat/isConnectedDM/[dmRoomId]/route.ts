import API from "@/lib/axiosClient";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {

    const { dmRoomId } = await context.params;

    const JWT = "jwtToken";

    const jwtToken = req.cookies.get(JWT)?.value;

    try {
        await API.get(`/room/dm-join/${dmRoomId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            }
        );
        return NextResponse.json({
            msg: "success",
        })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            msg: "something went wrong",
        }, { status: 500 })

    }
}

