import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: "https://fitandapp.site/api/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "https://fitandapp.site",
    }
}
const myHTTP = axios.create(config);
export default myHTTP;
