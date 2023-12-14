import axios from "./axios-client";

export const createInvoice = (token,form) => axios.post("invoice",form,{headers:{Authorization: `Bearer ${token}`}})

export const getOneInvoice = (token,directRequestId) => axios.get(`invoices?directRequestId=${directRequestId}`,{headers:{Authorization: `Bearer ${token}`}})