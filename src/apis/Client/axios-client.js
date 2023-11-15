import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Este será el dominio base
  headers: {
    'Content-Type': 'application/json'
  }
  
  //withCredentials: true, //  Axios permitirá enviar y recibir cookies y encabezados de autenticación
})

export default instance