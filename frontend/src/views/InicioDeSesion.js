import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, InputAdornment, Checkbox,FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleLogin1 from '../components/GoogleLogin1';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { UserContext } from '../context/UserContext'; 

const InicioDeSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { setUserEmail } = useContext(UserContext);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', { email, password });
      const { id: userId, email: userEmail } = response.data;
      localStorage.setItem('userId', userId);
      localStorage.setItem('userEmail', userEmail);
      setUserEmail(userEmail);
      setSuccess('Inicio de sesión exitoso');
      setError(null);
      console.log('ID del usuario guardado en localStorage:', userId); // Verificar el ID del usuario
      navigate('/opciones');
    } catch (error) {
      setError('Error al iniciar sesión');
      setSuccess(null);
    }
  };

  return (
    <Container
    sx={{
      width: { xs: '100%', sm: '360px' }, // Ancho 100% en pantallas pequeñas, 360px en pantallas medianas y grandes
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: { xs: 2, sm: 0 }, // Padding 2 en pantallas pequeñas, 0 en pantallas medianas y grandes
      marginTop: { xs: 2, sm: 5 }, // Margen superior 2 en pantallas pequeñas, 5 en pantallas medianas y grandes
    }}
    >
      <Box mt={5}    display="flex"
        flexDirection="column"
        alignItems="flex-start" // Cambiado de 'center' a 'flex-start'
      justifyContent="flex-start"
        textAlign="left">
        <Typography variant="h4" component="h1" gutterBottom 
         sx={{ 
          color: 'white',
          width: '361px',
          height: '32px',
          marginBottom: '24px',
          fontFamily: 'Poppins',
          fontSize: '24px',
         }}>
          Ingresar a mi cuenta
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label={isFocused ? '' : 'Ingresar email'}
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)} // Actualiza el estado al enfocar
            onBlur={() => setIsFocused(false)}
            fullWidth
            margin="normal"
            required
            size="small" // Tamaño pequeño
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ width: 20, height: 20, color: 'black' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true, // Permite que el label se encoja al escribir
            }}
            sx={{ 
              height: '50px', // Alto del input
              width: '361px',
              
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo del input
                color: 'black', // Color del texto
                '& fieldset': {
                  borderColor: 'white', // Color del borde
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Color del borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Color del borde al enfocar
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666666', // Color del label
                marginTop: '20px',
                marginLeft: '30px',
              
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black', // Color del icono
              },
            }} 
          />
          <TextField
            label={isPasswordFocused ? '' : 'Ingresar contraseña'}
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)} // Actualiza el estado al enfocar
            onBlur={() => setIsPasswordFocused(false)}
            fullWidth
            margin="normal"
            required
            size="small" // Tamaño pequeño
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    sx={{
                      width: '25px',
                      height: '25px',
                      borderRadius: '50%',
                      backgroundColor: '#FFD000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <LockIcon sx={{ width: 16, height: 21, color: 'black' }} />
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{ 
              height: '50px', // Alto del input
              width: '361px',
             
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo del input
                color: 'black', // Color del texto
                '& fieldset': {
                  borderColor: 'white', // Color del borde
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Color del borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Color del borde al enfocar
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666666', // Color del label
                marginTop: '20px',
                marginLeft: '30px',
               
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black', // Color del icono
              },
            }} 
          />

<Box display="flex" justifyContent="space-between" alignItems="center"
 sx={{ marginBottom: '48px' }}
>
  <FormControlLabel
    control={<Checkbox name="recordarme" color="primary"
      sx={{ color: 'white',
        '& .MuiSvgIcon-root': {
          fontSize: '13px', // Ajusta el tamaño del icono
        },
       }}
      />}
    label={
      <span style={{ fontFamily: 'Poppins', fontSize: '12px', color: 'white' }}>
        Recordarme
      </span>
    }
  />
  <Link href="#" variant="body2" sx={{ color: 'white',
   
   }}>
   <span style={{ fontFamily: 'Poppins', fontSize: '12px' }}>
    ¿Olvidaste tu contraseña?
  </span>
  </Link>
</Box>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}
          <Box display="flex" justifyContent="center" >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small" // Tamaño pequeño
            sx={{ 
              marginBottom: '44px',
             
              display: 'block', // Para centrar el botón
              backgroundColor: '#FFD000', // Color de fondo del botón
              color: 'black',
              borderRadius: '20px',
              height: '43px', // Alto del botón
              width: '361px', // Ancho del botón ajustado al contenido
              fontFamily: 'Poppins', // Aplica la fuente Poppins
              fontSize: '16px', // Tamaño de fuente 14px  
              textTransform: 'none',
            }}
          >
            Iniciar Sesión
          </Button>
          </Box>
        </form>
        <Box sx={{ 
            textAlign: 'center', // Centra el texto horizontalmente
            marginBottom: '24px',
            fontFamily: 'Poppins', // Aplica la fuente Poppins
            fontSize: '14px', // Tamaño de fuente 14px
            color: 'white', // Color del texto
            display: 'flex', // Utiliza flexbox
            justifyContent: 'center', // Centra el contenido horizontalmente
            alignItems: 'center', // C
            width: '100%', // Asegura que el contenedor ocupe todo el ancho disponible
    height: 'auto', // Ajusta la altura automáticamente
         }}>
          <p>O ingresar con</p>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom:"24px" }}>
          <GoogleLogin1 />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography component="h1" sx={{ color: 'white', mr: 2,
            fontFamily: 'Manrope', // Aplica la fuente Poppins
            fontSize: '16px', // Tamaño de fuente 14px
           }}>
           ¿ Todavía no tenés una cuenta?
          </Typography>
          <Button
            component={Link}
            to="/registro"
            variant="text"
            size="small"
            sx={{
              color: '#FFD000',
              width: 'auto', // Ajusta el ancho del botón al contenido
              height: 'auto', // Ajusta el alto del botón al contenido
              padding: 0, // Elimina el padding adicional
              borderRadius: '25px', // Elimina los bordes redondeados
             
              textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
              fontFamily: 'Poppins',
              fontSize: '16px',
            }}
          >
            Registrarme
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default InicioDeSesion;