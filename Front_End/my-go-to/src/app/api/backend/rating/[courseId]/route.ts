// import API from "@/lib/axiosClient";
// import { NextResponse, NextRequest } from "next/server";


// export async function GET(req: NextRequest, context: any) {

//     const jwt = 'jwtToken';

//     const jwtToken = req.cookies.get(jwt)?.value

//     const { courseId } = await context.params;

//     try {
//         const response = await API.get(`/review/get-all/${courseId}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${jwtToken}`,
//                 }
//             });
//         return NextResponse.json({
//             msg: "success",
//             data: response.data
//         })

//     } catch (error: any) {

//         console.error(error)
//         return NextResponse.json({
//             msg: "something went wrong",
//         }, { status: 500 })

//     }
// }

