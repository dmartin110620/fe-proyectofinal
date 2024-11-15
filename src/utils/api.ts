// src/utils/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Cambia esto según la URL de tu API

// Configura Axios para agregar el token de autenticación en las cabeceras, si es necesario
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para registrar un nuevo vehículo
export const saveVehicle = async (vehicleData: {
    plate: string;
    model: string;
    brand: string;
    capacity: number;
    photo: File | null;
}) => {
    const formData = new FormData();
    formData.append('plate', vehicleData.plate);
    formData.append('model', vehicleData.model);
    formData.append('brand', vehicleData.brand);
    formData.append('capacity', String(vehicleData.capacity));
    if (vehicleData.photo) {
        formData.append('photo', vehicleData.photo);
    }

    try {
        const response = await api.post('/vehicles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });
        return response.data; // Devuelve la respuesta de la API
    } catch (error) {
        console.error('Error al guardar el vehículo:', error);
        throw error;
    }
};

export const getVehicles = async () => {
    try {
        const response = await api.get('/vehicles');
        return response.data; // Devuelve la lista de vehículos
    } catch (error) {
        console.error('Error al obtener vehículos:', error);
        throw error;
    }
};

export const deleteVehicle = async (vehicleId: string) => {
    try {
        await api.delete(`/vehicles/${vehicleId}`);
    } catch (error) {
        console.error('Error al eliminar el vehículo:', error);
        throw error; // Lanza el error para que pueda ser manejado en el componente
    }
};

export const getConfirmedPassengers = async () => {
    try {
        const response = await api.get('/confirmed-passengers'); // Cambia la URL según tu backend
        return response.data; // Devuelve la lista de pasajeros confirmados
    } catch (error) {
        console.error('Error al obtener pasajeros confirmados:', error);
        throw error; // Lanza el error para que pueda ser manejado en el componente
    }
};

export const createWheel = async (wheelData: {
    origin: string;
    destination: string;
    date: string;  // Puede ser un string o Date, según cómo gestiones la fecha
    capacity: number;
    price: number;
}) => {
    try {
        const response = await api.post('/wheels', wheelData);
        return response.data; 
    } catch (error) {
        console.error('Error al crear el wheel:', error);
        throw error;
    }
};

export const getConfirmedWheels = async () => {
    try {
        const response = await axios.get(`${API_URL}/wheels/confirmed`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener wheels confirmados:', error);
        throw error; 
    }
};

export const searchWheels = async (filters: any) => {
    try {
        const response = await axios.post(`${API_URL}/wheels/search`, filters);
        return response.data;
    } catch (error) {
        console.error('Error al buscar wheels:', error);
        throw error; 
    }
};

export default {
    saveVehicle,
    getVehicles,
    deleteVehicle,
    getConfirmedPassengers,
    createWheel,
    getConfirmedWheels,
    searchWheels,
};
