import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleLogin1 from '../components/GoogleLogin1';
import { Link } from 'react-router-dom';

const InicioDeSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', { email, password });
      setSuccess('Inicio de sesión exitoso');
      setError(null);
      navigate('/opciones');
    } catch (error) {
      setError('Error al iniciar sesión');
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ingresar a mi cuenta
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="ingresar email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="ingresar contraseña"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Iniciar Sesión
          </Button>
        </form>
        
          <GoogleLogin1 />
          <Button component={Link} to="/registro" variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }}>
            Registrarse
          </Button>
      </Box>
    </Container>
  );
};

export default InicioDeSesion;