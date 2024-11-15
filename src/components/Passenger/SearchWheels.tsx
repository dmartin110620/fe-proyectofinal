// src/components/SearchWheels.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchWheels.css';

interface SearchWheelsProps {
    onSearch: (filters: any) => Promise<void>;
}

const SearchWheels: React.FC<SearchWheelsProps> = ({ onSearch }) => {
    const navigate = useNavigate();
    const [route, setRoute] = useState('');
    const [pickupPoint, setPickupPoint] = useState('');
    const [passengers, setPassengers] = useState<number>(1);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const filters = {
            route,
            pickupPoint,
            passengers
        };
        await onSearch(filters);
    };

    const handleCancel = () => {
        navigate('/passenger');
    };

    return (
        <div className="search-wheels-container">
            <h2>Busca un wheels</h2>
            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <label htmlFor="route">Elige una ruta</label>
                    <input
                        type="text"
                        id="route"
                        placeholder="Autopista"
                        value={route}
                        onChange={(e) => setRoute(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="pickupPoint">Punto de recogida</label>
                    <input
                        type="text"
                        id="pickupPoint"
                        placeholder="Heroes"
                        value={pickupPoint}
                        onChange={(e) => setPickupPoint(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="passengers">Cuantos cupos necesitas?</label>
                    <div className="number-input">
                        <button type="button" onClick={() => setPassengers(passengers > 1 ? passengers - 1 : 1)}>-</button>
                        <span>{passengers}</span>
                        <button type="button" onClick={() => setPassengers(passengers + 1)}>+</button>
                    </div>
                </div>

                <div className="button-group">
                    <button type="button" onClick={handleCancel} className="cancel-button">Filtra tu búsqueda</button>
                    <button type="submit" className="search-button">Buscar</button>
                </div>
            </form>
        </div>
    );
};

export default SearchWheels;
