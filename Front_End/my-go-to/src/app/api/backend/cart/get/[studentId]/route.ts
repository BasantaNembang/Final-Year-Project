import API from "@/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, context: any) {

    const jwt = 'jwtToken';

    const jwtToken = req.cookies.get(jwt)?.value

    const { studentId } = await context.params;

    try {
        const response = await API.get(`/cart/${studentId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`
                }
            });
        return NextResponse.json({
            message: "success",
            enrollData: response.data
        })

    } catch (error: any) {
        console.error(error)
        return NextResponse.json({
            message: "Some thing went wrong"
        }, { status: 500 })
    }


}

