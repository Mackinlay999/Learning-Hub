// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://learning-hub-p2yq.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
