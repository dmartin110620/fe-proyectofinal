// ConfirmedPassengerCard.tsx
import React from 'react';

const ConfirmedPassengerCard: React.FC<{ passenger: any }> = ({ passenger }) => {
    return (
        <div>
            <h3>{passenger.name}</h3>
            <p>{passenger.details}</p>
        </div>
    );
};

export default ConfirmedPassengerCard;