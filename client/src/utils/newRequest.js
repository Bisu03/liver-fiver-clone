/* eslint-disable no-undef */
import axios from "axios";



const newRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_API_KEY,
    withCredentials: true,
});

export default newRequest;