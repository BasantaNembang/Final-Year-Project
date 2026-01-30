import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const JWT = "jwtToken";
    const jwtToken = req.cookies.get(JWT)?.value


    if (!jwtToken) {
        return NextResponse.json({
            token: "please login"
        }, { status: 500 })
    }
    {
        return NextResponse.json({
            jwtToken: jwtToken
        }, { status: 200 })
    }


}

