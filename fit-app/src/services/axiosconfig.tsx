import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: "http://191.252.210.147:6868/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "http://191.252.210.147:6868/",
    }
}
const myHTTP = axios.create(config);
export default myHTTP;
