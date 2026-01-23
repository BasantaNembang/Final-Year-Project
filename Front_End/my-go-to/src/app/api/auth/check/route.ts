import { verifyAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";


export const dynamic = "force-dynamic";  //say`s next router do`t cache is cause next GET method is cache in a normal flow
//it must be execute in every render

export async function GET(req: NextRequest) {

    const JWT = 'jwtToken';

    const jwtToken = req.cookies.get(JWT)?.value

    if (!jwtToken) {
        return NextResponse.json({
            isLoggedIn: false
        })
    }

    const valid = await verifyAuth(jwtToken);

    if (!valid) {
        return NextResponse.json({
            isLoggedIn: false
        })
    } else {
        return NextResponse.json(
            { isLoggedIn: true },
        );

    }


}

