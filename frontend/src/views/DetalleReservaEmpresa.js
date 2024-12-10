import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Box, Button, Snackbar,Alert, Dialog,  DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate, useParams} from 'react-router-dom';

const DetalleReservaEmpresa = () => {
  const [reservas, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const {id}= useParams();
  

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/reservas/${id}`);
        setReserva(response.data);
      } catch (error) {
        setError('Error fetching ultima reserva');
      } finally {
        setLoading(false);
      }
    };

    fetchReserva();
  }, [id]);

  const handleAnularClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmAnular = async () => {
    try {
      // Llamada a la API para eliminar la reserva
      await axios.delete(`http://127.0.0.1:8000/reservas/${reservas.id}`);
      // Navegar a la página de inicio después de cancelar la reserva
      setSuccessMessage('Reserva eliminada de forma exitosa');
      // Redirigir a la página de inicio después de 2 segundos
      setOpenDialog(false);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      setError('Error al cancelar la reserva');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw', // Ancho del contenedor principal
      height: '100vh', // Alto del contenedor principal
     
    }}
  >
    <Box sx={{  
       display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '550px', // Ancho del contenedor
      height: '673px', // Alto del contenedor
      mt: 10,
      backgroundColor: '#504D4D', // Color de fondo opcional
      borderRadius: '20px', // Bordes redondeados opcionales
      boxShadow: 3, // Sombra opcional}}>
    }}>
      <Card sx={{
        width: '403px', // Ancho de la tarjeta
        height: '540px', // Alto de la tarjeta
        borderRadius: '15px',
        boxShadow: 3,
        backgroundColor: '#414141',
    
      }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ color: 'white',
          fontFamily: 'Poppins', // Aplica la fuente Poppins
          fontSize: '24px', // Tamaño de fuente 24px
          mt: 2, // Margen superior de 2
          mb: 2, // Margen inferior de 2
           }}>
            Turno Reservado
          </Typography>
          {reservas ? (
            <>
              <Typography
  sx={{
    mb: 1.5,
    color: 'white',
    fontFamily: 'Poppins', // Aplica la fuente Poppins
    fontSize: '16px', // Tamaño de fuente 16px
  }}
>
  <strong>Empresa:</strong> <span style={{ fontFamily: 'Poppins', fontSize: '16px' }}>{reservas.empresa}</span>
</Typography>
<Typography
  sx={{
    mb: 1.5,
    color: 'white',
    fontFamily: 'Poppins', // Aplica la fuente Poppins
    fontSize: '16px', // Tamaño de fuente 16px
  }}
>
  <strong>Dirección:</strong> <span style={{ fontFamily: 'Poppins', fontSize: '16px' }}>{reservas.ubicacion}</span>
</Typography>
<Typography
  sx={{
    mb: 1.5,
    color: 'white',
    fontFamily: 'Poppins', // Aplica la fuente Poppins
    fontSize: '16px', // Tamaño de fuente 16px
  }}
>
  <strong>Servicio:</strong> <span style={{ fontFamily: 'Poppins', fontSize: '16px' }}>{reservas.servicio}</span>
</Typography>
<Typography
  sx={{
    mb: 1.5,
    color: 'white',
    fontFamily: 'Poppins', // Aplica la fuente Poppins
    fontSize: '16px', // Tamaño de fuente 16px
  }}
>
  <strong>Precio:</strong> <span style={{ fontFamily: 'Poppins', fontSize: '16px' }}>${reservas.precio}</span>
</Typography>
<Typography
  sx={{
    mb: 1.5,
    color: 'white',
    fontFamily: 'Poppins', // Aplica la fuente Poppins
    fontSize: '16px', // Tamaño de fuente 16px
  }}
>
  <strong>Barbero:</strong> <span style={{ fontFamily: 'Poppins', fontSize: '16px' }}>{reservas.barbero}</span>
</Typography>
<Typography
  sx={{
    mb: 1.5,
    color: 'white',
    fontFamily: 'Poppins', // Aplica la fuente Poppins
    fontSize: '16px', // Tamaño de fuente 16px
  }}
>
  <strong>Fecha:</strong> <span style={{ fontFamily: 'Poppins', fontSize: '16px' }}>{reservas.fecha}</span>
</Typography>
<Typography
  sx={{
    mb: 1.5,
    color: 'white',
    fontFamily: 'Poppins', // Aplica la fuente Poppins
    fontSize: '16px', // Tamaño de fuente 16px
  }}
>
  <strong>Hora:</strong> <span style={{ fontFamily: 'Poppins', fontSize: '16px' }}>{reservas.horario}</span>
</Typography>
            </>
          ) : (
            <Typography sx={{ mb: 1.5, color: 'white' }}>
              No se encontró la reserva.
            </Typography>
          )}
        </CardContent>
        <Button
  variant="contained"
  color="primary"
  onClick={() => navigate('/home')}
  sx={{
    width: '166px',  
    height: '43px',
    borderRadius: '30px',
    border: '2px solid #FFD000',
    margin: '10px',
    backgroundColor: 'transparent',
    color: '#FFD000',
    '&:hover': {
      backgroundColor: 'grey', // Cambia el fondo a gris al hacer hover
    },
  }}
>
<Typography
    sx={{
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '14px', // Tamaño de fuente 14px
     
      textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
    }}
  >
    Editar
  </Typography>
</Button>

      <Button
  variant="contained"
  color="secondary"
  onClick={handleAnularClick}
  sx={{
    width: '166px',  
    height: '43px',
    borderRadius: '30px',
    margin: '10px',
    backgroundColor: '#FF8272',
    color: 'white',
    '&:hover': {
      backgroundColor: 'gray', // Cambia el fondo a gris al hacer hover
    },
  }}
>
<Typography
sx={{
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '14px', // Tamaño de fuente 14px
     
      textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
    }}
  >
    Anular
  </Typography>
</Button>
      </Card>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={2000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            width: '321px', // Ancho del diálogo
            height: '241px', // Alto del diálogo
            borderRadius: '28px', // Bordes redondeados
          },
        }}
      >
        <DialogTitle
        sx={{
          fontFamily: 'Poppins', // Aplica la fuente Poppins
          fontSize: '24px', // Tamaño de fuente 24px
          color: '#1D1B20', // Color del texto
        }}
        >Anular turno</DialogTitle>
        <DialogContent sx={{width:'250px'}}>
          <DialogContentText
          sx={{
            fontFamily: 'Poppins', // Aplica la fuente Poppins
            fontSize: '14px', // Tamaño de fuente 14px
            color: '#49454F', // Color del texto
          }}
          >
        Estás a punto de anular el turno, una vez anulado no podras recuperarlo. ¿Estás seguro que deseas anular el turno?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} 
           sx={{
           
            color: '#666666', // Texto blanco
           
          }}
          >
             <Typography
    sx={{
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '14px', // Tamaño de fuente 14px
      color: '#666666', // Asegura que el color del texto sea consistente
      textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
      mb: 2, // Margen inferior de 2
    }}
  >
    Cancelar
  </Typography>
          </Button>
          <Button onClick={handleConfirmAnular} 
           sx={{
           
            color: 'red', // Texto blanco
           
          }}
          >
             <Typography
    sx={{
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '14px', // Tamaño de fuente 14px
      color: '#EB2424', // Asegura que el color del texto sea consistente
      textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
      mb: 2, // Margen inferior de 2
      mr: 4, // Margen derecho de 2
    }}
  >
    Anular
  </Typography>
          </Button>
        </DialogActions>
      </Dialog>
     
    </Box>
  </Box>
  );
};

export default DetalleReservaEmpresa;