import React from 'react';
import './ConfirmedWheelCard.css';

interface ConfirmedWheelCardProps {
    wheel: {
        title: string;
        description: string;
        driverName?: string;
        vehicleModel?: string;
        capacity?: number;
    };
    onClick: () => void;
    className?: string; // Add className as an optional prop
}

const ConfirmedWheelCard: React.FC<ConfirmedWheelCardProps> = ({ wheel, onClick, className }) => {
    return (
        <div className={`wheel-card ${className}`} onClick={onClick}>
            <h3 className="wheel-title">{wheel.title}</h3>
            <p className="wheel-description">{wheel.description}</p>
            {wheel.driverName && <p><strong>Driver:</strong> {wheel.driverName}</p>}
            {wheel.vehicleModel && <p><strong>Vehicle:</strong> {wheel.vehicleModel}</p>}
            {wheel.capacity && <p><strong>Capacity:</strong> {wheel.capacity}</p>}
        </div>
    );
};

export default ConfirmedWheelCard;
