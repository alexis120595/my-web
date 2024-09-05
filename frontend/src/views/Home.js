import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import Calendario from '../components/Calendario';

const Home = () => {
  const [servicios, setServicios] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [selectedServicio, setSelectedServicio] = useState('');
  const [selectedBarbero, setSelectedBarbero] = useState('');
  const [selectedHorario, setSelectedHorario] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Solicitud para obtener los servicios
    axios.get('http://127.0.0.1:8000/servicios')
      .then(response => {
        setServicios(response.data);
      })
      .catch(error => {
        console.error('Error fetching servicios:', error);
      });

    // Solicitud para obtener los barberos
    axios.get('http://127.0.0.1:8000/barberos')
      .then(response => {
        setBarberos(response.data);
      })
      .catch(error => {
        console.error('Error fetching barberos:', error);
      });

    // Solicitud para obtener los horarios
    axios.get('http://127.0.0.1:8000/horarios')
      .then(response => {
        setHorarios(response.data);
      })
      .catch(error => {
        console.error('Error fetching horarios:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedServicio) {
      // Solicitud para obtener un servicio específico junto con los barberos relacionados
      axios.get(`http://127.0.0.1:8000/servicios/${selectedServicio}`)
        .then(response => {
          setBarberos(response.data.barberos);
        })
        .catch(error => {
          console.error('Error fetching barberos:', error);
        });
    }
  }, [selectedServicio]);

  useEffect(() => {
    if (selectedBarbero) {
      // Solicitud para obtener un barbero específico junto con los horarios relacionados
      axios.get(`http://127.0.0.1:8000/barberos/${selectedBarbero}`)
        .then(response => {
          setHorarios(response.data.horarios);
        })
        .catch(error => {
          console.error('Error fetching horarios:', error);
        });
    }
  }, [selectedBarbero]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verifica que todos los campos requeridos estén seleccionados
    if (!selectedServicio || !selectedBarbero || !selectedHorario || !selectedDate) {
      console.error('Todos los campos son requeridos');
      return;
    }

    const formData = {
      servicio_id: selectedServicio,
      barbero_id: selectedBarbero,
      horario_id: selectedHorario,
      fecha: selectedDate.toISOString().split('T')[0], // Asegúrate de que la fecha esté en el formato correcto
    };

    console.log('Formulario enviado', formData);

    axios.post('http://127.0.0.1:8000/reservas', formData)
      .then(response => {
        console.log('Formulario enviado', response.data);
        // Puedes manejar la respuesta aquí, como mostrar un mensaje de éxito
      })
      .catch(error => {
        console.error('Error enviando el formulario:', error);
        // Puedes manejar el error aquí, como mostrar un mensaje de error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Servicios</h1>
      <FormControl fullWidth margin="normal">
        <InputLabel id="servicio-label">Servicio</InputLabel>
        <Select
          labelId="servicio-label"
          value={selectedServicio}
          onChange={(e) => setSelectedServicio(e.target.value)}
        >
          {servicios.map(servicio => (
            <MenuItem key={servicio.id} value={servicio.id}>
              {servicio.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <h1>Barberos</h1>
      <FormControl fullWidth margin="normal">
        <InputLabel id="barbero-label">Barbero</InputLabel>
        <Select
          labelId="barbero-label"
          value={selectedBarbero}
          onChange={(e) => setSelectedBarbero(e.target.value)}
        >
          {barberos.map(barbero => (
            <MenuItem key={barbero.id} value={barbero.id}>
              {barbero.nombre} {barbero.apellido}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <h1>Horarios</h1>
      <FormControl fullWidth margin="normal">
        <InputLabel id="horario-label">Horario</InputLabel>
        <Select
          labelId="horario-label"
          value={selectedHorario}
          onChange={(e) => setSelectedHorario(e.target.value)}
        >
          {horarios.map(horario => (
            <MenuItem key={horario.id} value={horario.id}>
              {horario.hora}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <h1>Calendario</h1>
      <Calendario selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> {/* Renderiza el componente Calendario */}

      <Button type="submit" variant="contained" color="primary">Enviar</Button>
    </form>
  );
};

export default Home;