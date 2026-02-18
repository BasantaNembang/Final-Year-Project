import API from "@/lib/axiosClient";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server"

interface backendResponse {
  msg?: string,
  flag?: boolean,
  httpStatus?: number
}

export async function POST(req: NextRequest) {

  const cartData = await req.json();

  const JWT = "jwtToken";

  const jwtToken = req.cookies.get(JWT)?.value

  try {
    await API.post(`/cart`, cartData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`
        }
      }
    );
    return NextResponse.json({
      msg: "success",
    })
  } catch (err: any) {
    const error = err as AxiosError;
    const errorResposne = error.response?.data as backendResponse;
    return NextResponse.json({
      msg: errorResposne.msg,
      flag: errorResposne.flag,
      httpStatus: errorResposne.httpStatus,
    }, { status: 500 })
  }

}

