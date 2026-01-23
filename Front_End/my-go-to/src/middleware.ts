import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
import API from "./lib/axiosClient";


export async function middleware(req: NextRequest) {

    const JWT = "jwtToken";
    const REFRESH_TOKEN = "refreshToken";

    const { pathname } = req.nextUrl;

    //skip the authentication
    if (pathname.startsWith("/_next") || pathname.startsWith("public") ||
        pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    const jwtToken = req.cookies.get(JWT)?.value;


    const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value;


    let verifyToken = null;
    try {
        if (jwtToken) {
            verifyToken = await verifyAuth(jwtToken)
        }
    } catch (error) {
        console.error(error)
    }



    if (req.url.includes("/auth") && verifyToken) {
        return NextResponse.redirect(new URL("/", req.url))
    }


    //WORKOUT FOR AUTH & REFRESH TOKEN
    if (!jwtToken) { //error or expriation of jwt 
        if (!refreshToken) {  // error in refresh token as well go to Login
            return NextResponse.redirect(new URL("/auth", req.url))
        } else {//meaning error in jwt but present of refresh token so, regenerate the token
            return await handelReresh(req, refreshToken)
        }
    }

    //for role_Base
    interface Role_Path {
        prefix: string
        role: string
    }

    const Role_Path_Map: Role_Path[] = [
        { prefix: "/payment", role: "STUDENT" }
    ]


    const userRole = verifyToken?.roles

    for (const role of Role_Path_Map) {
        if (pathname.startsWith(role.prefix)) {
            if (!userRole || userRole != role.role) {
                return NextResponse.redirect(new URL("/unauthorized", req.url))
            }
            break;
        }
    }

    return NextResponse.next();


}



export async function handelReresh(req: NextRequest, refreshToken: string) {

    try {
        let backendResponse = await API.post('/auth/refresh_token',
            { refreshToken: refreshToken }, { headers: { "Content-Type": "application/json" } })

        const res = NextResponse.next();

        res.cookies.set("jwtToken", backendResponse.data.jwtToken, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60,
            sameSite: 'lax'
        })
        return res;

    } catch (error) {
        return NextResponse.redirect(new URL("/auth", req.url))
    }


}


export const config = {
    matcher: ["/payment/:path*",
        "/learnings/:path*"
    ]
}

//add role student in learnigs
