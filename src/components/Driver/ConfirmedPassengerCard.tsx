import React from 'react';

interface ConfirmedPassengerCardProps {
    passenger: any;
    className?: string; // Add className as an optional prop
}

const ConfirmedPassengerCard: React.FC<ConfirmedPassengerCardProps> = ({ passenger, className }) => {
    return (
        <div className={`confirmed-passenger-card ${className || ''}`}>
            {/* Render passenger details here */}
            <p>{passenger.name}</p>
            {/* Add any other passenger information as needed */}
        </div>
    );
};

export default ConfirmedPassengerCard;
