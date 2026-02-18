import API from "@/lib/axiosClient";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

    const jwt = 'jwtToken';

    const jwtToken = req.cookies.get(jwt)?.value

    const data = await req.json();

    console.log('data')
    console.log(data)


    try {
        const response = await API.post("/review/do", data, { headers: { Authorization: `Bearer ${jwtToken}` } })

        return NextResponse.json({
            msg: "successfully submitted the review",
            data: response.data
        })

    } catch (error: any) {
        console.error(error)

        return NextResponse.json({
            msg: "some thing went wrong, unable to save the review",
        }, { status: 500 })

    }
}

