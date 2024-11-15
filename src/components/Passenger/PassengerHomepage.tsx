import React, { useEffect, useState } from 'react';
import { getConfirmedWheels, searchWheels } from '../../utils/api.ts'; // Importar las funciones necesarias
import ConfirmedWheelCard from './ConfirmedWheelCard.tsx'; // Asegúrate de crear este componente
import SearchWheels from './SearchWheels.tsx'; // Componente para buscar wheels
import Modal from '../common/Modal.tsx'; // Componente modal para mostrar detalles de wheels
import '../Passenger/Passenger.css';

const PassengerHomePage: React.FC = () => {
    const [confirmedWheels, setConfirmedWheels] = useState<any[]>([]); // Estado para wheels confirmados
    const [availableWheels, setAvailableWheels] = useState<any[]>([]); // Estado para wheels disponibles
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
    const [selectedWheel, setSelectedWheel] = useState<any | null>(null); // Estado para wheel seleccionado
    const [error, setError] = useState<string>(''); // Estado para manejar errores

    // Cargar wheels confirmados al montar el componente
    useEffect(() => {
        const fetchConfirmedWheels = async () => {
            try {
                const wheels = await getConfirmedWheels(); // Llama a la API para obtener wheels confirmados
                setConfirmedWheels(wheels);
            } catch (error) {
                setError('Error al cargar wheels confirmados.'); // Manejo de errores
                console.error(error);
            }
        };

        fetchConfirmedWheels();
    }, []);

    // Función para abrir el modal y mostrar los detalles del wheel seleccionado
    const handleWheelClick = (wheel: any) => {
        setSelectedWheel(wheel);
        setIsModalOpen(true);
    };

    // Función para buscar wheels
    const handleSearch = async (filters: any) => {
        try {
            const wheels = await searchWheels(filters); // Llama a la API para buscar wheels
            setAvailableWheels(wheels);
        } catch (error) {
            setError('Error al buscar wheels.'); // Manejo de errores
            console.error(error);
        }
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedWheel(null);
    };

    return (
        <div>
            <h1>Página Principal del Pasajero</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el error si existe */}
            
            <h2>Wheels Confirmados</h2>
            <div className="confirmed-wheels">
                {confirmedWheels.map((wheel) => (
                    <ConfirmedWheelCard
                        key={wheel.id}
                        wheel={wheel}
                        onClick={() => handleWheelClick(wheel)} // Maneja el clic en la tarjeta
                    />
                ))}
            </div>

            <h2>Buscar Wheels</h2>
            <SearchWheels onSearch={handleSearch} /> {/* Componente para buscar wheels */}
            
            {/* Modal para mostrar detalles del wheel seleccionado */}
            {isModalOpen && selectedWheel && (
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Detalles del Wheel</h2>
                <p><strong>Conductor:</strong> {selectedWheel.driverName}</p>
                <p><strong>Vehículo:</strong> {selectedWheel.vehicleModel}</p>
                <p><strong>Capacidad:</strong> {selectedWheel.capacity}</p>
                <p><strong>Ruta:</strong> {selectedWheel.route}</p>
                {/* Aquí puedes agregar más información sobre el wheel */}
                <button onClick={closeModal}>Cerrar</button>
            </Modal>
        )}
        </div>
    );
};

export default PassengerHomePage;
