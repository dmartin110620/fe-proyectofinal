import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate para la redirección
import axios from 'axios';
import '../Auth/Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

        if (!email || !password) {
            setError('Por favor, rellena todos los campos');
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
                { email, password },
                { withCredentials: true } // Asegúrate de agregar esta línea
            );

            const { token, role } = response.data;
            localStorage.setItem('token', token);

            // Redirigir según el rol del usuario
            if (role === 'pasajero') {
                navigate('/passenger-home');
            } else if (role === 'conductor') {
                navigate('/driver-home');
            }
        } catch (error: any) {
            console.error('Error en el inicio de sesión:', error);
            setError(error.response?.data?.message || 'Credenciales inválidas o error en el servidor');
        }
    };


    const handleRegister = () => {
        navigate('/register'); // Redirigir a la página de registro
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">ID Universitario</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='0000289115'
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='******'
                        required
                    />
                </div>
                <button type="submit" className="btn">Iniciar Sesión</button>
            </form>
            <button onClick={handleRegister} className="btn register-btn">Registrarse</button> {/* Botón de registro */}
        </div>
    );
};

export default Login;
