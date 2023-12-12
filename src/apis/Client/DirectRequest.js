import axios from "./axios-client";




export const createServiceRequest = (requestData,token) => axios.post(`/directrequest`,requestData,
{headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data' // Asegúrate de establecer el tipo de contenido adecuado
  }})


export const showAllDirectRequestToOneTechnical=(token,technicalId,state) => axios.get(`/directrequest?technicalId=${technicalId}&state=${state}&stateInvoice=0`,{headers:{Authorization:`Bearer ${token}`}})



export const showAllDirectRequestToOneTechnicalAlreadyInvoice=(token,technicalId,state)=> axios.get(`/directrequest?technicalId=${technicalId}&state=${state}&stateInvoice=1`,{headers:{Authorization:`Bearer ${token}`}})

export const showAllDirectRequestToOneClient=(token,clientId,state) => axios.get(`/directrequest?clientId=${clientId}&state=${state}`,{headers:{Authorization:`Bearer ${token}`}})