import axios from "./axios-client";

export const getAvailabilities = (token) =>  axios.get("/availabilities",{headers:{Authorization: `Bearer ${token}`}})

