// # Vista que maneja el proceso de inicio de sesión de un usuario, utilizando axios para enviar los datos al servidor.
// # Permite iniciar sesión con Google y redirige al usuario a la página de opciones tras un inicio de sesión exitoso.
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
 
  // # Maneja el envío del formulario de inicio de sesión

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
      console.log('ID del usuario guardado en localStorage:', userId); 
      navigate('/opciones');
    } catch (error) {
      setError('Error al iniciar sesión');
      setSuccess(null);
    }
  };

  return (
    <Container
    sx={{
      width: { xs: '100%', sm: '360px' }, 
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: { xs: 2, sm: 0 }, 
      marginTop: { xs: 2, sm: 5 }, 
    }}
    >
      <Box mt={5}    display="flex"
        flexDirection="column"
        alignItems="flex-start" 
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

         {/* # Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit}>
          {/* # Campo para el email */}
          <TextField
            label={isFocused ? '' : 'Ingresar email'}
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)} 
            onBlur={() => setIsFocused(false)}
            fullWidth
            margin="normal"
            required
            size="small" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ width: 20, height: 20, color: 'black' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true, 
            }}
            sx={{ 
              height: '50px', 
              width: '361px',
              
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                color: 'black', 
                '& fieldset': {
                  borderColor: 'white', 
                },
                '&:hover fieldset': {
                  borderColor: 'white', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', 
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666666', 
                marginTop: '20px',
                marginLeft: '30px',
              
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black', 
              },
            }} 
          />
           {/* # Campo para la contraseña */}
          <TextField
            label={isPasswordFocused ? '' : 'Ingresar contraseña'}
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)} 
            onBlur={() => setIsPasswordFocused(false)}
            fullWidth
            margin="normal"
            required
            size="small" 
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
              height: '50px', 
              width: '361px',
             
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                color: 'black', 
                '& fieldset': {
                  borderColor: 'white', 
                },
                '&:hover fieldset': {
                  borderColor: 'white', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', 
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666666', 
                marginTop: '20px',
                marginLeft: '30px',
               
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black', 
              },
            }} 
          />
{/* # Recordarme y ¿Olvidaste tu contraseña? */}

<Box display="flex" justifyContent="space-between" alignItems="center"
 sx={{ marginBottom: '48px' }}
>
  <FormControlLabel
    control={<Checkbox name="recordarme" color="primary"
      sx={{ color: 'white',
        '& .MuiSvgIcon-root': {
          fontSize: '13px', 
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

          {/* # Botón de inicio de sesión */}
          <Box display="flex" justifyContent="center" >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small" 
            sx={{ 
              marginBottom: '44px',
              display: 'block', 
              backgroundColor: '#FFD000', 
              color: 'black',
              borderRadius: '20px',
              height: '43px', 
              width: '361px', 
              fontFamily: 'Poppins', 
              fontSize: '16px', 
              textTransform: 'none',
            }}
          >
            Iniciar Sesión
          </Button>
          </Box>
        </form>

        <Box sx={{ 
            textAlign: 'center', 
            marginBottom: '24px',
            fontFamily: 'Poppins', 
            fontSize: '14px', 
            color: 'white', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%', 
    height: 'auto', 
         }}>
          <p>O ingresar con</p>
        </Box>
        {/* # Botón de inicio de sesión con Google */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom:"24px" }}>
          <GoogleLogin1 />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography component="h1" sx={{ color: 'white', mr: 2,
            fontFamily: 'Manrope', 
            fontSize: '16px', 
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
              width: 'auto', 
              height: 'auto', 
              padding: 0, 
              borderRadius: '25px', 
             
              textTransform: 'none', 
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