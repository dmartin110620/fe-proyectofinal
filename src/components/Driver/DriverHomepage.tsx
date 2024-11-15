// src/components/Driver/DriverHomePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DriverHomePage.css';
import { getVehicles, getConfirmedPassengers, createWheel } from '../../utils/api.ts';
import VehicleForm from './VehicleForm.tsx';
import ConfirmedPassengerCard from './ConfirmedPassengerCard.tsx';

const DriverHomePage = () => {
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [confirmedPassengers, setConfirmedPassengers] = useState<any[]>([]);
    const [showVehicleForm, setShowVehicleForm] = useState<boolean>(false);
    const [showCreateWheelForm, setShowCreateWheelForm] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchVehicles();
        fetchConfirmedPassengers();
    }, []);

    // Function to fetch vehicles
    const fetchVehicles = async () => {
        try {
            const response = await getVehicles();
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles', error);
        }
    };

    // Function to fetch confirmed passengers
    const fetchConfirmedPassengers = async () => {
        try {
            const response = await getConfirmedPassengers();
            setConfirmedPassengers(response.data);
        } catch (error) {
            console.error('Error fetching confirmed passengers', error);
        }
    };

    // Function to handle creating a wheel
    const handleCreateWheel = async (wheelData: any) => {
        try {
            await createWheel(wheelData);
            fetchConfirmedPassengers();
            setShowCreateWheelForm(false);
        } catch (error) {
            console.error('Error creating wheel', error);
        }
    };

    const handleNavigateToPassenger = () => {
        navigate('/passenger');
    }

    return (
        <div className="driver-homepage">
            <h1>Página Principal del Conductor</h1>

            <div className="tab-buttons">
                <button className="tab-button" onClick={handleNavigateToPassenger}>Pasajero</button>
                <button className="tab-button active">Conductor</button>
            </div>

            {vehicles.length === 0 ? (
                <div className="no-vehicles-message">
                    <h2>No tienes vehículos registrados.</h2>
                    <button className="add-vehicle-button" onClick={() => setShowVehicleForm(true)}>Agregar Vehículo</button>
                </div>
            ) : (
                <div>
                    <h2>Tus Vehículos</h2>
                    <ul className="vehicles-list">
                        {vehicles.map(vehicle => (
                            <li key={vehicle.id}>
                                {vehicle.model} - {vehicle.plate}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <h2>Pasajeros Confirmados</h2>
            <div className='confirmed-passengers-cont'>
                <div className="confirmed-passengers">
                {confirmedPassengers.length === 0 ? (
                    <p>No hay pasajeros confirmados.</p>
                ) : (
                    confirmedPassengers.map(passenger => (
                        <ConfirmedPassengerCard className="confirmed-passenger-card" key={passenger.id} passenger={passenger} />
                    ))
                )}
            </div>
            </div>

            <button className="create-wheel-button" onClick={() => setShowCreateWheelForm(true)}>Crear Wheel</button>

            {showCreateWheelForm && (
                <div className="create-wheel-form">
                    <h3>Crear un nuevo Wheel</h3>
                    {/* Add your form elements here for creating a wheel */}
                </div>
            )}

            {showVehicleForm && (
                <VehicleForm
                    onClose={() => setShowVehicleForm(false)}
                    onSave={fetchVehicles}
                />
            )}
        </div>
    );
};

export default DriverHomePage;
