import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import '../css/Auth.css';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (status === 'succeeded') {
      alert('Login exitoso');
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
    dispatch(login(form));
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="auth-button">Login</button>
        {status === 'failed' && <p className="error-message">{error}</p>}
        <p>No tienes una cuenta? <Link to="/registro" className="register-link">Registrarse</Link></p>
      </form>
    </div>
  );
};

export default Login;
