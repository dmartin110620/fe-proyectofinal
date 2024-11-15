import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateWheels.css';

interface RideFormProps {
    onCreate: (rideData: RideData) => void;
}

interface RideData {
    route: string;
    departure: string;
    destination: string;
    passengers: number;
    date: string;
    time: string;
}

const RideForm: React.FC<RideFormProps> = ({ onCreate }) => {
    const [route, setRoute] = useState('');
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [passengers, setPassengers] = useState<number | ''>(1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!route || !departure || !destination || passengers === '' || !date || !time) {
            setError('All fields are required.');
            return;
        }

        const rideData: RideData = {
            route,
            departure,
            destination,
            passengers: Number(passengers),
            date,
            time,
        };

        onCreate(rideData);
        setError('');
    };

    const handleNavigateToDriver = () => {
        navigate('/driver');
    }; 

    return (
        <div className="ride-form-container">
            <h2>Create un Wheels</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="route">Establece ruta</label>
                    <input
                        type="text"
                        id="route"
                        value={route}
                        onChange={(e) => setRoute(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="departure">Punto de partida</label>
                    <input
                        type="text"
                        id="departure"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="destination">Destino</label>
                    <input
                        type="text"
                        id="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="passengers">Cupos disponibles</label>
                    <input
                        type="number"
                        id="passengers"
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        min="1"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Fecha</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Hora</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="create-button">Create Wheels</button>
                <button type="submit" className="cancel-button" onClick={handleNavigateToDriver}>Cancelar</button>
            </form>
        </div>
    );
};

export default RideForm;
