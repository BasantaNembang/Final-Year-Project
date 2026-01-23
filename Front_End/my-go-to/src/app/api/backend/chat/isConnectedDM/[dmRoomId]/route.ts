import API from "@/lib/axiosClient";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {

    const { dmRoomId } = await context.params;

    try {
        await API.get(`/room/dm-join/${dmRoomId}`);
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

