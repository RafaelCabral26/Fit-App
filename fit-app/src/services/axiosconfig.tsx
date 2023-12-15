import axios, { AxiosRequestConfig } from "axios";
const currentEnviroment = process.env.NODE_ENV;
const config: AxiosRequestConfig = {
    baseURL: (currentEnviroment == "development") ? "http://localhost:6868/api/" : "https://fitandapp.site/api/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": (currentEnviroment == "development") ? "http://localhost:6868" : "https://fitandapp.site",
    }
}
const myHTTP = axios.create(config);
export default myHTTP;
