import axios from "./axios-client";

export const getUserInformation = (id,token) => axios.get(`/user/${id}`,{headers:{Authorization: `Bearer ${token}`}})
