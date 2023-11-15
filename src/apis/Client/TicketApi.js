import axios from './axios-client';

const getUserInformation = async(id) => {
    try {
       const response = await axios.get(`/user/${id}`)
       return response.data
    } catch (error) {
      console.log(error);
    }
 }
 

const createTicketSupport = async(ticket,token) => {
   try {
      const response = await axios.post(`/TicketSuport`,ticket,{
         headers: {
           'Authorization': `Bearer ${token}` 
         }
       })
      return response.data
   } catch (error) {
      return error;
   }
}
 export {getUserInformation,createTicketSupport}