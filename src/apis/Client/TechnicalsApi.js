
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1'; // Cambia la URL a la API de tu servidor

const getAllTechnicals = async (token) => {

    try {
        const response = await axios.get(`${API_URL}/technicals`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        return error
    }
}


export { getAllTechnicals }