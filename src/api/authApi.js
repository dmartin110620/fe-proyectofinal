import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/api';

// Registrar nuevo usuario
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
};

// Iniciar sesión de usuario
export const loginUser = async (loginData) => {
    const response = await axios.post(`${API_URL}/users/login`, loginData);
    return response.data;
};

// Cerrar sesión
export const logoutUser = async () => {
    const response = await axios.post(`${API_URL}/users/logout`);
    return response.data;
};
