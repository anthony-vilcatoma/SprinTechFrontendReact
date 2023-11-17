import axios from "./axios-client";

export const getProfessions = (token) =>  axios.get("/professions",{headers:{Authorization: `Bearer ${token}`}})


export const getCategoriesByService = (token) => axios.get("/categorieService",{headers:{
    Authorization : `Bearer ${token}`
}})