import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Cambia la URL a la API de tu servidor

const getTicket = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/admin/requesTicket/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTickets = async() =>{
  try {
    const response = await axios.get(`${API_URL}/admin/requesTickets`);
    return response.data;
  } catch (error) {
    
  }
}


const getUserInformation = async(id) => {
   try {
      const response = await axios.get(`${API_URL}/admin/user/${id}`)
      return response.data
   } catch (error) {
    
   }
}


const createAnswer = async (answerData) => {
  try {
    const response = await axios.post(`${API_URL}/admin/answerTicket`, answerData);
    return response;
  } catch (error) {
    throw error;
  }
};


export { getTicket, createAnswer,getTickets,getUserInformation };
