import axios, { AxiosError } from "axios";

export const Api = axios.create({
    baseURL: "http://localhost:9090/course",
});



//function to store course
export async function saveCourse(formData: FormData,
    onProgress?: (progress: number) => void
) {
    let response = null;
    try {
        response = await Api.post("/save", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / (progressEvent.total || 1)
                );
                if (onProgress) {
                    onProgress(percentCompleted);
                }
            }
        });
        console.info(response)
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(String(error));
        }
    }
}



//function to get all Courses
export async function getCourses() {
    let response = null;
    try {
        response = await Api.get("/get-all");
        //console.log(response)
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        const error = err as AxiosError;
        console.log(error)

    }
}

