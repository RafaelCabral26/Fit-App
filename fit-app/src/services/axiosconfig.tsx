import axios, { AxiosRequestConfig } from "axios";

const config:AxiosRequestConfig = {
    baseURL:"http://localhost:6868/",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
}
const myHTTP = axios.create(config);
export default myHTTP;
