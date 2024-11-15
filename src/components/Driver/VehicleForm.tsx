import React, { useState } from 'react';
import './VehicleForm.css';

interface VehicleFormProps {
    onClose: () => void;
    onSave: () => Promise<void>;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ onClose, onSave }) => {
    const [plate, setPlate] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [capacity, setCapacity] = useState<number | ''>('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!plate || !model || !brand || (capacity !== '' && capacity <= 0) || !photo) {
            setError('Todos los campos son obligatorios y la capacidad debe ser mayor a 0.');
            return;
        }

        try {
            await onSave();
            onClose();
        } catch (error) {
            setError('Error al guardar el vehículo.');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2 className="title">Agrega los datos de tu vehículo</h2>
            {error && <p className="error">{error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="plate" className="label">Placa</label>
                    <input
                        type="text"
                        id="plate"
                        value={plate}
                        onChange={(e) => setPlate(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="brand" className="label">Marca</label>
                    <input
                        type="text"
                        id="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="model" className="label">Modelo</label>
                    <input
                        type="text"
                        id="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="capacity" className="label">Capacidad del vehículo (Personas)</label>
                    <input
                        type="number"
                        id="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))}
                        className="input"
                        min="1"
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="photo" className="label">Foto del vehículo</label>
                    <input
                        type="file"
                        id="photo"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files) {
                                setPhoto(e.target.files[0]);
                            }
                        }}
                        className="input"
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="soat" className="label">Foto del SOAT</label>
                    <input
                        type="file"
                        id="soat"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files) {
                                setPhoto(e.target.files[0]);
                            }
                        }}
                        className="input"
                        required
                    />
                </div>
                <div className="buttonContainer">
                    <button type="button" className="button cancelButton" onClick={onClose}>
                        Cancelar
                    </button>
                    <button type="submit" className="button saveButton">
                        Agregar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VehicleForm;
