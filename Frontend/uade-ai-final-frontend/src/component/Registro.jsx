import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../features/auth/authSlice';
import '../css/Auth.css';

const Registro = () => {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    mail: '',
    login: '',
    pass: '',
    role: 'USER'
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (status === 'succeeded') {
      alert('Registro exitoso');
      navigate('/');
    }
  }, [status, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form));
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Registrarse</h2>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={form.telefono} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="mail" value={form.mail} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Login:</label>
          <input type="text" name="login" value={form.login} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" name="pass" value={form.pass} onChange={handleChange} required />
        </div>
        <button type="submit" className="auth-button">Registrar</button>
        {status === 'failed' && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Registro;