import axios from "./axios-client"

export const getAllProfessions = (token) => axios.get("professions", {
    headers: {
        "Authorization": `Bearer ${token}`,
    }
});
