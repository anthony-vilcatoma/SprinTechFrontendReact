import axios from "./axios-client"

// recibe un user, hace una consulta y pasa como segundo valor(req.body)
export const loginRequest = (user) => axios.post(`/auth/authenticate`, user)

export const registerRequest = (user) => axios.post(`/auth/register`, user)

export const verifyTokenRequest = (token) => axios.post("/auth/verifytoken", token)