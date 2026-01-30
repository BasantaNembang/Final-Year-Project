import API from "@/lib/axiosClient";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest, context: any) {

    const jwt = 'jwtToken';

    const jwtToken = req.cookies.get(jwt)?.value

    const { roomId } = await context.params;

    try {
        const response = await API.post(`/room/create/${roomId}`, {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
        return NextResponse.json({
            msg: "success",
            data: response.data
        })

    } catch (error: any) {
        return NextResponse.json({
            msg: "something went wrong",
        }, { status: 500 })

    }
}

