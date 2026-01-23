import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const USER_ID = "userId";

    const userID = req.cookies.get(USER_ID)?.value


    if (!userID) {
        return NextResponse.json({
            userId: "some error occur"
        }, { status: 500 })
    }
    {
        return NextResponse.json({
            userId: userID
        }, { status: 200 })
    }


}

