import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Auth/Register.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    universityID: '',
    fullName: '',
    email: '',
    contactNumber: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { universityID, fullName, email, contactNumber, password } = formData;

    if (!universityID || !fullName || !email || !contactNumber || !password) {
      setError('Por favor, rellena todos los campos');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        universityID,
        fullName,
        email,
        contactNumber,
        password,
      });

      setSuccess(true);
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 2000); 
    } catch (err) {
      console.log(err.response?.data);
      setError('Hubo un error en el registro. Intenta nuevamente.');
    }

  };

  return (
    <div className="register-container">
      <h2>Registrar Usuario</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Registro exitoso! Redirigiendo al inicio de sesión...</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="universityID">ID Universitario</label>
          <input
            type="text"
            id="universityID"
            name="universityID"
            value={formData.universityID}
            onChange={handleChange}
            placeholder='0000289115'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Nombre completo</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder='Daniel Martín'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='example@unisabana.edu.co'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Número de contacto</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder='(123)-456-7890'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Contraseña'
            required
          />
        </div>
        <button type="submit" className="btn">Registrar</button>
      </form>
      <button onClick={() => navigate('/')}>Volver al inicio de sesión</button>
    </div>
  );
};

export default Register;
