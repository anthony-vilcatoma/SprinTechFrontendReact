import axios from "./axios-client";

export const getProfessions = (token) =>  axios.get("/professions",{headers:{Authorization: `Bearer ${token}`}})


export const getCategoriesByService = (token) => axios.get("/categorieService",{headers:{
    Authorization : `Bearer ${token}`
}})


export const createProfession = (token,form,tecnicoId) => axios.post(`/technicals/${tecnicoId}/professions-availability`,form,{
    headers : {
        Authorization: `Bearer ${token}`
    }
})

export const getAllProfessionByTechnical = (token,tecnicoId) => axios.get(`/technicals/${tecnicoId}/professions-availability`,
{
    headers:{
        Authorization:`Bearer ${token}`
    }
})


export const updateProfessionByAvailability = (token,form,professionAvailabilityId) => axios.put(`/technical/professions-availability/${professionAvailabilityId}`,form,
{headers:{Authorization:`Bearer ${token}`}})


export const getProfessionByAvailabilityFromId = (token,id) => axios.get(`/technicals/professions-availability/${id}`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})


export const getProfessionsAvaialbilitiesByTechnicalIdAndProfessionId = (token,TechnicalId,ProfessionId) => axios.get(`/technical/professions-availability/${TechnicalId}/${ProfessionId}`,
{headers:{
    Authorization:`Bearer ${token}`
}})



export const deleteProfessionAvailabilityById = (token,professionAvailabilityId) => axios.delete(`technical/professions-availability/${professionAvailabilityId}`,
{
    headers:{
        Authorization:`Bearer ${token}`
    }
})