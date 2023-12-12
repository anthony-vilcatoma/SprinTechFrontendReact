import axios from "./axios-client";

export const createServicebyProfession = (token, formData) => {
  return axios.post("/services", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data' // Asegúrate de establecer el tipo de contenido adecuado
    }
  });
};


export const getAllServicesByProfessionAndTechnical = (token,technicalId,professionId) => axios.get(`/services-availability?technicalId=${technicalId}&professionId=${professionId}`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
})