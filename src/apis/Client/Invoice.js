import axios from "./axios-client";

export const createInvoice = (token,form) => axios.post("invoice",form,{headers:{Authorization: `Bearer ${token}`}})