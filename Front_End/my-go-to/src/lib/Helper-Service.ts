import { ReviewData } from "@/types/reviewData";
import axios from "axios";

//requred the security

//to get cuurent user-ID
export async function getUserID() {

    let response = null;
    try {
        response = await axios.get("/api/auth/getId");
        return response.data.userId;

    } catch (err) {
        throw new Error("Please logIN")
    }
}

//to get enroll course by user
export async function getAllEnrollCourse(userId: string) {

    let response = null;
    try {
        response = await axios.get(`/api/backend/enrollget/${userId}`);
        
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        throw new Error('Error in geting all enroll course')
    }
}


//do ratings
export async function doRatings(data: ReviewData) {

    let response = null;
    try {
        response = await axios.post("/api/backend/ratings/", data);
        if (response.status === 200) {
            return true;
        }
    } catch (err) {
        throw new Error('Error')
    }
}


//get all ratings
export async function getAllRatings(courseId: string) {
    let response = null;
    try {
        response = await axios.get(`/api/backend/rating/${courseId}`);
        console.log('response')
        console.log(response)
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (err) {
        throw new Error('Error')
    }
}

