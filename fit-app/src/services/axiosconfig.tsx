import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: "https://fit-api-fduu.onrender.com",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "http://localhost:8080/",
    }
}
        console.log("BASE URLL",process.env.BASE_URL);
const myHTTP = axios.create(config);
export default myHTTP;
