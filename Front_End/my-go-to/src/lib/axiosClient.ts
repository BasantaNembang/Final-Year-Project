import axios from "axios";

const API = axios.create({
    //baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    baseURL: "http://localhost:9090",
    // baseURL: "http://api-gateway-svc:9090",
    withCredentials: true //for cookies
});

export default API;

