import axios from "./axios-client";

export const getTechnicallsByLocation = (token,professionId,availabilityId,latitude,longitude,distance) =>  
axios.get(`/technicals?professionId=${professionId}&availabilityId=${availabilityId}&latitude=${latitude}&longitude=${longitude}&distance=${distance}`,
{headers:{Authorization: `Bearer ${token}`}})

