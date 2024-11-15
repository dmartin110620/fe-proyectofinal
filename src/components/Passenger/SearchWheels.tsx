// src/components/SearchWheels.tsx
import React from 'react';

interface SearchWheelsProps {
    onSearch: (filters: any) => Promise<void>; // Asegúrate de que 'filters' tenga el tipo correcto
}

const SearchWheels: React.FC<SearchWheelsProps> = ({ onSearch }) => {
    const handleSearch = async () => {
        const filters = {}; // Aquí deberías definir los filtros que deseas pasar
        await onSearch(filters);
    };

    return (
        <div>
            <h2>Buscar Wheels</h2>
            {/* Formulario de búsqueda o controles */}
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};

export default SearchWheels;
