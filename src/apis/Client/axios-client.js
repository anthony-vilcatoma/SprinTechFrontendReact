import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://obedient-bath-production.up.railway.app/api/v1', // Este será el dominio base
  headers: {
    'Content-Type': 'application/json'
  }
  
  //withCredentials: true, //  Axios permitirá enviar y recibir cookies y encabezados de autenticación
})

export default instance