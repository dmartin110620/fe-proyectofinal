// src/components/Driver/DriverHomePage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVehicles, getConfirmedPassengers, createWheel } from '../../utils/api.ts';
import VehicleForm from './VehicleForm.tsx'; // Importa el formulario para agregar un vehículo
import ConfirmedPassengerCard from './ConfirmedPassengerCard.tsx'; // Componente para mostrar los pasajeros confirmados

const DriverHomePage = () => {
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [confirmedPassengers, setConfirmedPassengers] = useState<any[]>([]);
    const [showVehicleForm, setShowVehicleForm] = useState<boolean>(false);
    const [showCreateWheelForm, setShowCreateWheelForm] = useState<boolean>(false);

    useEffect(() => {
        fetchVehicles();
        fetchConfirmedPassengers();
    }, []);

    // Función para obtener los vehículos del conductor
    const fetchVehicles = async () => {
        try {
            const response = await getVehicles(); // Llama a la API para obtener vehículos
            setVehicles(response.data);
        } catch (error) {
            console.error('Error al obtener los vehículos', error);
        }
    };

    // Función para obtener los pasajeros confirmados
    const fetchConfirmedPassengers = async () => {
        try {
            const response = await getConfirmedPassengers(); // Llama a la API para obtener pasajeros confirmados
            setConfirmedPassengers(response.data);
        } catch (error) {
            console.error('Error al obtener los pasajeros confirmados', error);
        }
    };

    // Función para manejar la creación de un wheel
    const handleCreateWheel = async (wheelData: any) => {
        try {
            await createWheel(wheelData); // Llama a la API para crear un wheel
            fetchConfirmedPassengers(); // Refresca la lista de pasajeros confirmados
            setShowCreateWheelForm(false); // Cierra el formulario
        } catch (error) {
            console.error('Error al crear el wheel', error);
        }
    };

    return (
        <div>
            <h1>Página Principal del Conductor</h1>

            {vehicles.length === 0 ? (
                <div>
                    <h2>No tienes vehículos registrados.</h2>
                    <button onClick={() => setShowVehicleForm(true)}>Agregar Vehículo</button>
                </div>
            ) : (
                <div>
                    <h2>Tus Vehículos</h2>
                    <ul>
                        {vehicles.map(vehicle => (
                            <li key={vehicle.id}>
                                {vehicle.model} - {vehicle.plate}
                                {/* Puedes agregar más detalles y opciones para eliminar/modificar el vehículo */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <h2>Pasajeros Confirmados</h2>
            <div>
                {confirmedPassengers.length === 0 ? (
                    <p>No hay pasajeros confirmados.</p>
                ) : (
                    confirmedPassengers.map(passenger => (
                        <ConfirmedPassengerCard key={passenger.id} passenger={passenger} />
                    ))
                )}
            </div>

            <button onClick={() => setShowCreateWheelForm(true)}>Crear Wheel</button>

            {showCreateWheelForm && (
                <div>
                    {/* Aquí puedes incluir un componente/formulario para crear un nuevo wheel */}
                    <h3>Crear un nuevo Wheel</h3>
                    {/* Tu formulario para crear un wheel aquí */}
                </div>
            )}

            {showVehicleForm && (
                <VehicleForm
                    onClose={() => setShowVehicleForm(false)}
                    onSave={fetchVehicles} // Refresca la lista de vehículos después de agregar uno
                />
            )}
        </div>
    );
};

export default DriverHomePage;
