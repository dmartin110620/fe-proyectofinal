// src/components/ConfirmedWheelCard.tsx
import React from 'react';

// Define las propiedades que espera el componente
interface ConfirmedWheelCardProps {
    wheel: any; // Cambia 'any' por el tipo real de wheel que estás utilizando
    onClick: () => void; // Asegúrate de incluir onClick
}

const ConfirmedWheelCard: React.FC<ConfirmedWheelCardProps> = ({ wheel, onClick }) => {
    return (
        <div className="confirmed-wheel-card" onClick={onClick}>
            <h3>{wheel.title}</h3>
            <p>{wheel.details}</p>
            {/* Más información sobre el wheel */}
        </div>
    );
};

export default ConfirmedWheelCard;
