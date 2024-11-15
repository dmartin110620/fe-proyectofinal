// src/components/Driver/VehicleForm.tsx
import React, { useState } from 'react';

interface VehicleFormProps {
    onClose: () => void;          // Función para cerrar el formulario
    onSave: () => Promise<void>;  // Función para ejecutar después de guardar el vehículo
}

const VehicleForm: React.FC<VehicleFormProps> = ({ onClose, onSave }) => {
    const [plate, setPlate] = useState<string>('');         // Estado para la placa del vehículo
    const [model, setModel] = useState<string>('');         // Estado para el modelo del vehículo
    const [brand, setBrand] = useState<string>('');         // Estado para la marca del vehículo
    const [capacity, setCapacity] = useState<number | ''>(''); // Estado para la capacidad del vehículo
    const [photo, setPhoto] = useState<File | null>(null);   // Estado para la foto del vehículo
    const [error, setError] = useState<string>('');          // Estado para manejar errores

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Validación básica de los campos
        if (!plate || !model || !brand || (capacity !== '' && capacity <= 0) || !photo) {
            setError('Todos los campos son obligatorios y la capacidad debe ser mayor a 0.');
            return;
        }

        const vehicleData = {
            plate,
            model,
            brand,
            capacity,
            photo, // Aquí deberías manejar la carga de la foto de manera adecuada
        };

        try {
            // Lógica para guardar el vehículo, puede ser un llamado a la API
            // Ejemplo: await saveVehicle(vehicleData);
            await onSave(); // Llama a la función onSave pasada como prop para refrescar la lista
            onClose();      // Cierra el formulario después de guardar
        } catch (error) {
            setError('Error al guardar el vehículo.'); // Manejo de errores
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Registrar Vehículo</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el error si existe */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="plate">Placa:</label>
                    <input
                        type="text"
                        id="plate"
                        value={plate}
                        onChange={(e) => setPlate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="model">Modelo:</label>
                    <input
                        type="text"
                        id="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="brand">Marca:</label>
                    <input
                        type="text"
                        id="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="capacity">Capacidad:</label>
                    <input
                        type="number"
                        id="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))}
                        min="1" // Asegura que la capacidad sea al menos 1
                        required
                    />
                </div>
                <div>
                    <label htmlFor="photo">Foto del Vehículo:</label>
                    <input
                        type="file"
                        id="photo"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files) {
                                setPhoto(e.target.files[0]); // Captura la foto seleccionada
                            }
                        }}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default VehicleForm;
