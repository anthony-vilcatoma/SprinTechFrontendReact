import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1'; // Cambia la URL a la API de tu servidor

const getAllProfessions = async(token) =>{
    try{
        const response = await axios.get(`${API_URL}/professions`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    }catch{

    }
};

export {getAllProfessions}