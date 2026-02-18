import axios from "axios";


export const Api = axios.create({
  baseURL: "http://localhost:8080/video",
});


//function to booked room save video
export async function saveVideoBackend(selectedFile: FormData,
  onProgress?: (progress: number) => void
) {
  let response = null;
  try {
    response = await Api.post("/save", selectedFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        if (onProgress) {
          onProgress(percentCompleted);
        }
      },
    });
  } catch (error) {
  }
}


//function to get videoes
export async function getVideo(vid: string) {
  let response = null;
  try {
    response = await Api.get(`/get/${vid}`,
      {
        headers: {
          'Range': 'bytes=0-1023',
        },
      }
    );
    return response;

  } catch (error) {
    console.error(error)
  }
}


//for the HSL stream
export async function getStreamURL(streamId: string) {

  let response = null;
  try {
    response = await axios.get(`/api/backend/stream/${streamId}`);
    return response.data;
  } catch (err) {
    console.log(err)
  }
}

