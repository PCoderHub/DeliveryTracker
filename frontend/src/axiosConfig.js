import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        //"ngrok-skip-browser-warning": "true",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    },
    withCredentials: true,
})