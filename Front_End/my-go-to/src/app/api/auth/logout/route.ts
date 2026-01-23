import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const JWT = "jwtToken";
    const REFRESH_TOKEN = "refreshToken";
    const USER_ID = "userId";


    const res = NextResponse.json({
        message: "Log Out successfully"
    })

    res.cookies.set(JWT, "", { expires: new Date(0), path: "/" });
    res.cookies.set(REFRESH_TOKEN, "", { expires: new Date(0), path: "/" });
    res.cookies.set(USER_ID, "", { expires: new Date(0), path: "/" });

    return res;

}

