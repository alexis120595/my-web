import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Checkbox, FormControlLabel, IconButton, InputAdornment} from '@mui/material';
import SubidaImagenesAjustes from '../components/SubidaImagenesAjustes';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkIcon from '@mui/icons-material/Link';



const AjustesEmpresa = ({  }) => {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [sloganEmpresa, setSloganEmpresa] = useState('');
  const [descripcionEmpresa, setDescripcionEmpresa] = useState('');
  const [reprogramarTurnos, setReprogramarTurnos] = useState('');
  const [anticipacionReserva, setAnticipacionReserva] = useState('');
  const [anticipacionReprogramar, setAnticipacionReprogramar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [mostrarOnline, setMostrarOnline] = useState(false);
  const [id, setId] = useState('');
  
  
  const [opciones, setOpciones] = useState({
    opcion1: false,
    opcion2: false,
    opcion3: false,
    
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
  
  
    console.log('Opcioness:', opciones);
  };

  const handleCancel = () => {
    // Aquí puedes manejar la acción de cancelar, por ejemplo, limpiando los campos del formulario
 
  
    setOpciones({
        opcion1: false,
        opcion2: false,
        opcion3: false,
        
      });
  };  



  const handleOpcionesChange = (event) => {
    setOpciones({
      ...opciones,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('www.soyprofesional.com/miempresa');
    alert('Enlace copiado al portapapeles');
  };

  const handleDownloadQR = () => {
    // Aquí puedes manejar la lógica para descargar el código QR
    alert('Código QR descargado');
  };



  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh" sx={{ mt: 170 }}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="50%">
        <Typography variant="h4" component="h1" align="center" sx={{ mr: 23, mt:2}}>
          Ajustes
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  

</Box>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Nombre de la empresa"
            type="text"
            variant="outlined"
            value={nombreEmpresa}
            onChange={(e) => setNombreEmpresa(e.target.value)}
            sx={{
              mt: 2,
              mb: 2,
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />

<TextField
            label="Slogan de la empresa"
            type="text"
            variant="outlined"
            value={sloganEmpresa}
            onChange={(e) => setSloganEmpresa(e.target.value)}
            sx={{
              mt: 2,
              mb: 2,
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />

<TextField
            label="Descripcion de la empresa"
            type="text"
            variant="outlined"
            value={descripcionEmpresa}
            onChange={(e) => setDescripcionEmpresa(e.target.value)}
            multiline
            rows={4} 
            sx={{
              mt: 2,
              mb: 2,
              width: '300px',
              
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />

<SubidaImagenesAjustes />


        <Typography variant="h4" component="h1" align="center"  sx={{ ml:1, mt:2}}>
          Perfil de mi empresa
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ ml: 1, mt:2}}>
    Podras personalizar tu ID y compartir el link
  </Typography>

  <Typography variant="body1" align="center" sx={{ ml:1}}>
    de tu empresa con tus clientes. Para que tu
  </Typography>

  <Typography variant="body1" align="center" sx={{ mr: 5}}>
   empresa sea visible en la plataforma
  </Typography>

  <Typography variant="body1" align="center" sx={{ mr: 1, mb:2}}>
    debaras tener marcada la opcion "online"
  </Typography>

</Box>

<Box display="flex" alignItems="center" sx={{ mb: 2, mr:3, backgroundColor: 'lightgrey',
    borderRadius: '30px',
    padding: '10px', width:'300px'}}>
  <Checkbox
    checked={mostrarOnline}
    onChange={(e) => setMostrarOnline(e.target.checked)}
    name="mostrarOnline"
  />
  <Typography variant="body1" align="center">
    Mostrar mi empresa online
  </Typography>
</Box>

<TextField
  label="ID de la empresa"
  type="text"
  variant="outlined"
  value={id}
  onChange={(e) => setId(e.target.value)}
  sx={{
    mt: 2,
    mb: 2,
    mr: 3,
    width: '300px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px', // Bordes redondeados
    },
  }}
/>

<Typography variant="body1" align="center"  sx={{
    mt: 2,
    mb: 2,
    mr: 1,
          
  }}>
    www.soyprofesional.com/miempresa
    <IconButton onClick={handleCopyLink} sx={{ ml: 1 }}>
            <ContentCopyIcon />
          </IconButton>
  </Typography>

  <Typography variant="h4" component="h1" align="center"  sx={{ mr:18 , mt:2}}>
          Codigo QR
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ ml: 2, mt:2}}>
    Podras descargae una imagen QR del link de
  </Typography>

  <Typography variant="body1" align="center" sx={{ ml:1, mb:2}}>
    de tu empresa cpara utilizarla donde quieras 
  </Typography>
</Box>

<Typography variant="body1" align="center" sx={{ mt: 2, mb: 2, mr: 1 }}>
          Descargar imagen QR
          <IconButton onClick={handleDownloadQR} sx={{ ml: 13 }}>
            <DownloadIcon />
          </IconButton>
        </Typography>

        <Typography variant="h4" component="h1" align="center"  sx={{ ml:10 , mt:2}}>
          Señas con mercadopago
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ ml: 2, mt:2}}>
    Podes vincular tu cuenta de mercadopago
  </Typography>

  <Typography variant="body1" align="center" sx={{ ml:3}}>
    podes exigirle a tus clientes dejar una seña
  </Typography>
  <Typography variant="body1" align="center" sx={{ mr:10, mb:2}}>
    antes de realizar una reserva 
  </Typography>
</Box>

<Button
    variant="contained"
    color="primary"
    sx={{ mt: 2, mb:2, width: '300px', borderRadius: '20px', color: 'black', backgroundColor: 'yellow', '&:hover': { backgroundColor: 'darkyellow' } }}
  >
    Vincular cuenta
  </Button>

  <Typography variant="h4" component="h1" align="center"  sx={{ ml:1 , mt:2}}>
          Configurar reservas 
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ ml: 5, mt:1}}>
    Elegi requisitos y configuracion de reservas 
  </Typography>
  
</Box>

  
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1,  backgroundColor: 'lightgrey',
    borderRadius: '10px',
    padding: '20px', }}>
  <FormControlLabel
              control={
                <Checkbox
                  checked={opciones.opcion1}
                  onChange={handleOpcionesChange}
                  name="opcion1"
                 
                />
              }
              label="Requiere autenticacion del cliente  "
              sx={{ mr: 1 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                checked={opciones.opcion2}
                onChange={handleOpcionesChange}
                name="opcion2"
               
              />
            }
            label="Requerir DNI del cliente "
            sx={{ mr: 10 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                checked={opciones.opcion3}
                onChange={handleOpcionesChange}
                name="opcion3"
               
              />
            }
            label="Requerir Whatsapp del cliente"
            sx={{ mr: 4}}
            />
</Box>

<TextField
            label="Reprogrmacion de turnos permitida"
            type="text"
            variant="outlined"
            value={reprogramarTurnos}
            onChange={(e) => setReprogramarTurnos(e.target.value)}
            sx={{
              mt: 2,
              mb: 2,
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />

<TextField
            label="Hs minimas de anticipacion reserva"
            type="text"
            variant="outlined"
            value={anticipacionReserva}
            onChange={(e) => setAnticipacionReserva(e.target.value)}
            sx={{
              mt: 2,
              mb: 2,
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />

<TextField
            label="Hs minimas de anticipacion para reprogramar"
            type="text"
            variant="outlined"
            value={anticipacionReprogramar}
            onChange={(e) => setAnticipacionReprogramar(e.target.value)}
           
            sx={{
              mt: 2,
              mb: 2,
              width: '300px',
              
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />  

<Typography variant="h4" component="h1" align="center"  sx={{ mr:8 , mt:2}}>
          Redes sociales
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ mr: 3, mt:1}}>
    Ingresa el enlace a tus redes sociales 
  </Typography>

  <TextField
            label="WhatsApp"
            type="number"
            variant="outlined"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WhatsAppIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              mt: 2,
              mb: 2,
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />
          <TextField
            label="Instagram"
            type="text"
            variant="outlined"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InstagramIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              mt: 2,
              mb: 2,
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />
          <TextField
            label="Facebook"
            type="text"
            variant="outlined"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FacebookIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              mt: 2,
              mb: 2,
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />
          <TextField
            label="YouTube"
            type="text"
            variant="outlined"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <YouTubeIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              mt: 2,
              mb: 2,
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />
          <TextField
            label="TikTok"
            type="text"
            variant="outlined"
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
            
            sx={{
              mt: 2,
              mb: 2,
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />
</Box>

<Typography variant="h4" component="h1" align="center"  sx={{ mr:3 , mt:2}}>
          Eliminar empresa
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ ml: 1, mt:1}}>
    Si eliminas tu empresa todos tus datos e 
  </Typography>
  <Typography variant="body1" align="center" sx={{ ml: 1}}>
    informacion se perderar y ya no podras 
  </Typography>
  
  <Typography variant="body1" align="center" sx={{ mr: 23}}>
    recuperarlos
  </Typography>

  <Button
    variant="contained"
    color="secondary"
    sx={{ mt: 2, width: '300px', borderRadius: '20px', color: 'black', backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
    onClick={() => alert('Empresa eliminada')}
  >
    Eliminar cuenta
  </Button>
</Box>



          <Box display="flex" justifyContent="space-between" width="300px" mt={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'yellow',
                color: 'black',
                borderRadius: '20px',
                width: '45%',
                '&:hover': {
                  backgroundColor: 'darkyellow',
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'yellow',
                color: 'black',
                borderRadius: '20px',
                width: '45%',
                '&:hover': {
                  backgroundColor: 'darkyellow',
                },
              }}
            >
              Guardar
            </Button>
          </Box>
        </form>
      </Box>
     
    </Box>
  );
};

export default AjustesEmpresa;