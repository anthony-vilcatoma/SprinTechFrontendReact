import axios from "./axios-client";

export const getExperiences = (token) =>  axios.get("/experiences",{headers:{Authorization: `Bearer ${token}`}})

