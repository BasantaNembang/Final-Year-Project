import API from "@/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest, context: any) {

    const jwt = 'jwtToken';

    const jwtToken = req.cookies.get(jwt)?.value

    const { cartId } = await context.params;

    try {
        await API.delete(`/cart/${cartId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`
                }
            });
        return NextResponse.json({
            message: "success",
        })

    } catch (error: any) {
        console.error(error)
        return NextResponse.json({
            message: "Some thing went wrong"
        }, { status: 500 })
    }

}


