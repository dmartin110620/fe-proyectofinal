// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login.tsx'; // Ensure the path is correct with .tsx extension
import Register from './components/Auth/Register.tsx';
import DriverHomePage from './components/Driver/DriverHomepage.tsx'; // Ensure the path is correct with .tsx extension
import PassengerHomePage from './components/Passenger/PassengerHomepage.tsx'; // Ensure the path is correct with .tsx extension
import './App.css'; // Ensure this CSS file exists

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Page for login */}
                <Route path="/register" element={<Register />} /> {/* Asegúrate de que Register sea tu componente de registro */}
                <Route path="/driver" element={<DriverHomePage />} /> {/* Driver's homepage */}
                <Route path="/passenger" element={<PassengerHomePage />} /> {/* Passenger's homepage */}
            </Routes>
        </Router>
    );
};

export default App;
