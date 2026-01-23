// import API from "@/lib/axiosClient";
// import axios, { AxiosError } from "axios";
// import { NextRequest, NextResponse } from "next/server";


// export async function GET(req: NextRequest) {

//     const { searchParams } = new URL(req.url);

//     const roomId = searchParams.get("roomId")
//     const sMId = searchParams.get("sMId")
//     try {
//         const response = await axios.get(`http://localhost:8090/room/like_info?roomId=${roomId}&sMId=${sMId}`)
//         return NextResponse.json({
//             msg: "success",
//             data: response.data
//         })

//     } catch (error: any) {
//         console.error("error")
//         console.error(error)
//         console.error(error.data)

//         return NextResponse.json({
//             msg: "some thing went wrong",
//         }, { status: 500 })

//     }

// }
