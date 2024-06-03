// axiosConfig.js
import axios from 'axios';

// Créer une instance d'Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // base de votre API
});

// Ajouter un intercepteur pour inclure le token dans les en-têtes
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Récupérer le token du localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Ajouter le token à l'en-tête Authorization
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
