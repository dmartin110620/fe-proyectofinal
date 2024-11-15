// src/components/common/Modal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;  // Propiedad requerida
    onClose: () => void;  // Función para cerrar el modal
    children: React.ReactNode;  // Contenido del modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Si no está abierto, no renderizar nada

    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose}>Cerrar</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
