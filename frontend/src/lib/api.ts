import axios from "axios";

export const api=axios.create({
    baseURL: "https://url-shortener-backend-2i00.onrender.com/api/v1",
})