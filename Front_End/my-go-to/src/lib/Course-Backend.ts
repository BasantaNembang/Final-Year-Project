import axios, { AxiosError } from "axios";

export const Api = axios.create({
    baseURL: "http://localhost:9090/course",
});


//function to save course
export async function saveCourse(formData: FormData,
    onProgress?: (progress: number) => void
) {
    let response = null;
    try {
        response = await axios.post("/api/backend/course", formData, {
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
        console.log("response")
        console.log(response)
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        if (error instanceof AxiosError) {
            console.error(error)
            return error.response?.data;
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
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        const error = err as AxiosError;
        console.log(error)

    }
}

//function to get Courses by Name
export async function getCoursesByName(name : string) {
    let response = null;
    try {
        response = await Api.get(`/get/query/${name}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        const error = err as AxiosError;
        console.log(error)
    }
}

//function to get Courses by catgeory
export async function getCoursesByCategory(category : string) {
    let response = null;
    try {
        response = await Api.get(`/get/category/${category}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        const error = err as AxiosError;
        console.log(error)
    }
}

//function to get Courses by level
export async function getCoursesByLevel(level : string) {
    let response = null;
    try {
        response = await Api.get(`/get/level/${level}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        const error = err as AxiosError;
        console.log(error)
    }
}


//function to get Courses by level
export async function getCoursesByPrice(price : number) {
    let response = null;
    try {
        response = await Api.get(`/get/price/${price}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        const error = err as AxiosError;
        console.log(error)
    }
}
