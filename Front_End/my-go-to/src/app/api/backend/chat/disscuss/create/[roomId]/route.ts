import API from "@/lib/axiosClient";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";


//add the auth later
export async function POST(req: NextRequest, context: any) {

    const { roomId } = await context.params;

    try {
        const response = await API.post(`/room/create/${roomId}`);
        return NextResponse.json({
            msg: "success",
            data: response.data
        })

    } catch (error: any) {
        console.log("error")
        console.log(error.data)
        console.log(error)
        return NextResponse.json({
            msg: "something went wrong",
        }, { status: 500 })

    }
}

