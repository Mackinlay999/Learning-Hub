import axios from "axios"

const instance = axios.create({
    baseURL : "https://learning-hub-p2yq.onrender.com/api",
    withCredentials: true,
})



export default instance;



