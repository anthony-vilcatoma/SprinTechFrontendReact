import axios from "./axios-client";

export const getUserInformation = (id,token) => axios.get(`/user/${id}`,{headers:{Authorization: `Bearer ${token}`}})

export const updateUserInformationApi = (id,token,form ) => axios.put(`/user/${id}`,form,{headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data' // Asegúrate de establecer el tipo de contenido adecuado
  }})


  export const getClientInformation = (id,token) => axios.get(`/client/${id}`,{headers:{Authorization: `Bearer ${token}`}})


  export const getTechnicalInformation = (id,token) => axios.get(`/technical/${id}`,{headers:{Authorization: `Bearer ${token}`}})


  export const updateClientInformation = (token,form,clientId) => axios.put(`client/${clientId}`,form,
{headers:{Authorization:`Bearer ${token}`}})
