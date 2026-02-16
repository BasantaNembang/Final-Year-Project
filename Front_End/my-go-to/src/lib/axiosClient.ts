import axios from "axios";

const backendUrl = process.env.BACKEND_URL || "http://localhost:9090";

const API = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    timeout: 300000  // to prevent early failures
});

export default API;

