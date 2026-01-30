import API from "@/lib/axiosClient";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {

    const { roomId } = await context.params;

    const JWT = "jwtToken";

    const jwtToken = req.cookies.get(JWT)?.value;


    try {
        await API.get(`/room/join/${roomId}`,
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

