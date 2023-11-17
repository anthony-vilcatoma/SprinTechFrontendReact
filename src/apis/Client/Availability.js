import axios from "./axios-client";

export const getAllOptionsAvailability = (token) => axios.get("/availabilities",{headers:{Authorization: `Bearer ${token}`}})