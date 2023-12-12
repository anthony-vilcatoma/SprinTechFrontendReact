import axios from "./axios-client";

export const getTechnicallsByLocation = (token,professionId,availabilityId,latitude,longitude,distance) =>  
axios.get(`/technicals?professionId=${professionId}&availabilityId=${availabilityId}&latitude=${latitude}&longitude=${longitude}&distance=${distance}`,
{headers:{Authorization: `Bearer ${token}`}})



export const getServicesByCategorylByProfession =  (token,professionId,categoryServiceId,technicalId) => axios.get(`/services-availability?professionId=${professionId}&categoryId=${categoryServiceId}&technicalId=${technicalId}`,
{headers:{Authorization:`Bearer ${token}`}})


export const updateWorkingStatus = (token,technicalId,dataState) => axios.put(`technical/${technicalId}/update-workingstatus`,dataState,
{headers:{Authorization:`Bearer ${token}`}})