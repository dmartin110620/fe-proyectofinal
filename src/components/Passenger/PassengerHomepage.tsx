import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getConfirmedWheels, searchWheels } from '../../utils/api.ts';
import ConfirmedWheelCard from './ConfirmedWheelCard.tsx';
import SearchWheels from './SearchWheels.tsx';
import Modal from '../common/Modal.tsx';
import '../Passenger/Passenger.css';

const PassengerHomePage: React.FC = () => {
    const [confirmedWheels, setConfirmedWheels] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWheel, setSelectedWheel] = useState<any | null>(null);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConfirmedWheels = async () => {
            try {
                const wheels = await getConfirmedWheels();
                setConfirmedWheels(wheels);
            } catch (error) {
                setError('Error al cargar wheels confirmados.');
                console.error(error);
            }
        };
        fetchConfirmedWheels();
    }, []);

    const handleWheelClick = (wheel: any) => {
        setSelectedWheel(wheel);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedWheel(null);
    };

    const handleNavigateToDriver = () => {
        navigate('/driver');
    };
    const handleNavigateToSearch = () => {
        navigate('/search-wheels');
    };


    return (
        <div className="passenger-homepage">
            <h1>Página Principal del Pasajero</h1>
            {error && <p className="error">{error}</p>}

            <div className="tab-buttons">
                <button className="tab-button active">Pasajero</button>
                <button className="tab-button" onClick={handleNavigateToDriver}>Conductor</button>
            </div>

            <h2>Tus Wheels</h2>
            <div className="confirmed-wheels">
                {confirmedWheels.length > 0 ? (
                    confirmedWheels.map((wheel) => (
                        <ConfirmedWheelCard
                            key={wheel.id}
                            wheel={wheel}
                            onClick={() => handleWheelClick(wheel)}
                            className="confirmed-wheel-card"
                        />
                    ))
                ) : (
                    <p>No tienes ningún wheels activo</p>
                )}
            </div>

            <div id="search-button-container">
                <div id="search-button" onClick={handleNavigateToSearch}>
                    🔍
                </div>
                <p>Busca un wheels</p>
            </div>

            {isModalOpen && selectedWheel && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className="modal">
                        <h2>Detalles del Wheel</h2>
                        <p><strong>Conductor:</strong> {selectedWheel.driverName}</p>
                        <p><strong>Vehículo:</strong> {selectedWheel.vehicleModel}</p>
                        <p><strong>Capacidad:</strong> {selectedWheel.capacity}</p>
                        <p><strong>Ruta:</strong> {selectedWheel.route}</p>
                        <button onClick={closeModal}>Cerrar</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default PassengerHomePage;
