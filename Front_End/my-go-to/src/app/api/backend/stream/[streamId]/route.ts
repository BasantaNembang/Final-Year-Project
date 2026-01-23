import API from "@/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, context: any) {

    const jwt = 'jwtToken';

    const jwtToken = req.cookies.get(jwt)?.value

    const { streamId } = await context.params;


    try {
        const response = await API.get(`/video/stream-hsl/${streamId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
        console.log("response")
        console.log(response.data)

        return NextResponse.json({
            msg: "success",
            data: response.data
        })

    } catch (error: any) {
        console.log(error.response.data)

        return NextResponse.json({
            msg: "error",

        }, { status: 500 })


    }
}

