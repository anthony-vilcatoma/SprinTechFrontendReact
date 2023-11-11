import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1'; // Cambia la URL a la API de tu servidor

const getUserInformation = async(id) => {
    try {
       const response = await axios.get(`${API_URL}/user/${id}`)
       return response.data
    } catch (error) {
     
    }
 }
 

const createTicketSupport = async(ticket,token) => {
   try {
      const response = await axios.post(`${API_URL}/TicketSuport`,ticket,{
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