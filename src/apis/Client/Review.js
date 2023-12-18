import axios from "./axios-client";

export const createReview = (token,form) =>  axios.post("/reviews",form,{headers:{Authorization: `Bearer ${token}`}})

export const getAllReviews = (token,technicalId) => axios.get(`/reviews?technicalId=${technicalId}`,{headers:{Authorization: `Bearer ${token}`}})