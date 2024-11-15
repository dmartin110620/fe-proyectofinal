// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Si usas React 18 o superior
import App from './App'; // Importa tu componente App
import reportWebVitals from './reportWebVitals'; // Opcional, para medir rendimiento

const rootElement = document.getElementById('root'); // Asegúrate de que el ID coincida con tu archivo HTML
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App /> {/* Renderiza tu componente App */}
        </React.StrictMode>
    );
}

// Opcional: Para medir el rendimiento
reportWebVitals();
