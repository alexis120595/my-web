// vista de ajustes de la empresa
import React, { useState, useEffect, useRef} from 'react';
import { QRCode } from 'react-qrcode-logo';
import { Typography, Box, TextField, Button, Checkbox, FormControlLabel, IconButton, InputAdornment} from '@mui/material';
import SubidaImagenesAjustes from '../components/SubidaImagenesAjustes';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkIcon from '@mui/icons-material/Link';
import axios from 'axios';





const AjustesEmpresa = ({  }) => {
  // Estados para guardar los valores de los campos del formulario
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
  const [imagenUrl, setImagenUrl] = useState(''); 
  
  // Estado para guardar las opciones de configuración de reservas
  const [opciones, setOpciones] = useState({
    opcion1: false,
    opcion2: false,
    opcion3: false,
    
  });
// Función para obtener la información de la empresa desde la API
  useEffect(() => {
    const fetchEmpresa = async () => {
      const empresaId = localStorage.getItem('empresaId');
      try {
        const response = await axios.get(`http://localhost:8000/empresa/${empresaId}`);
        const empresa = response.data;
        setNombreEmpresa(empresa.nombre);
        setSloganEmpresa(empresa.eslogan);
        setImagenUrl(empresa.imagen_url);
        setWhatsapp(empresa.whatsapp || '');
        setInstagram(empresa.instagram || '');
        setFacebook(empresa.facebook || '');
        setYoutube(empresa.youtube || '');
        setTiktok(empresa.tiktok || '');
      } catch (error) {
        console.error('Error fetching empresa:', error);
      }
    };

    fetchEmpresa();
  }, []);

// función para editar la información de la empresa y enviarla a la API
  const handleSubmit = async (event) => {
    event.preventDefault();
    const empresaId = localStorage.getItem('empresaId');

    const updatedEmpresa = {
      nombre: nombreEmpresa,
      eslogan: sloganEmpresa,
      imagen_url: imagenUrl,
    };
// Objeto con las redes sociales de la empresa
  const redesSociales = {
      whatsapp,
      instagram,
      facebook,
      youtube,
      tiktok,
    };  
// Petición PUT para actualizar la información de la empresa
    try {
      await axios.put(`http://localhost:8000/empresa/${empresaId}`, updatedEmpresa);

      // Petición POST para crear las redes sociales de la empresa
      await axios.post(`http://localhost:8000/empresa/${empresaId}/redes-sociales`, redesSociales);
      
      alert('Información de la empresa actualizada correctamente');
    } catch (error) {
      console.error('Error updating empresa:', error);
      alert('Error al actualizar la información de la empresa');
    }
  };
// Función para limpiar los campos del formulario
  const handleCancel = () => {

    setNombreEmpresa('');
    setSloganEmpresa('');
    setDescripcionEmpresa('');
    setReprogramarTurnos('');
    setAnticipacionReserva('');
    setAnticipacionReprogramar('');
    setWhatsapp('');
    setInstagram('');
    setFacebook('');
    setYoutube('');
    setTiktok('');
    setMostrarOnline(false);
    setId('');
    setImagenUrl('');
  
    setOpciones({
        opcion1: false,
        opcion2: false,
        opcion3: false,
        
      });
  };  


// Función para manejar los cambios en las opciones de configuración de reservas
  const handleOpcionesChange = (event) => {
    setOpciones({
      ...opciones,
      [event.target.name]: event.target.checked,
    });
  };
// Función para copiar el enlace de la empresa al portapapeles
  const handleCopyLink = () => {
    navigator.clipboard.writeText('www.soyprofesional.com/miempresa');
    alert('Enlace copiado al portapapeles');
  };

  
// Referencia al elemento que contiene el código QR
  const qrRef = useRef();
// Función para descargar el código QR de la empresa
  const handleDownloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };



  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
     
    }}
  >
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh" sx={{ mt: 90,
      width: '360px',
      height: '2505px',
    }}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="50%">
        <Typography variant="h4" component="h1" align="center" sx={{ mr: 36, mt:2,
          fontSize: '20px',
          fontFamily:'Poppins', 
        }}>
          Ajustes
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  

</Box>
        {/* Formulario para editar la información de la empresa */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Campos del formulario, para cambiar el nombre */}
          <TextField
            
            type="text"
            variant="outlined"
            value={nombreEmpresa}
            onChange={(e) => setNombreEmpresa(e.target.value)}
            sx={{
              mt: 2,
              mb: 2,
              height: '50px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: 'black', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', 
                },
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Poppins', 
                fontSize: '14px',      
                color: '#666666',    
              },
              '& input': {
                fontFamily: 'Poppins',
                fontSize: '14px',      
                color: '#666666',  
              },
            }}
          />
{/* Campo del formulario para cambiar el eslogan */}
<TextField
            
            type="text"
            variant="outlined"
            value={sloganEmpresa}
            onChange={(e) => setSloganEmpresa(e.target.value)}
            sx={{
              mt: 2,
              mb: 2,
              height: '50px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: 'black', 
                },
                '&:hover fieldset': {
                  borderColor: 'black', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
              '& input': {
                fontFamily: 'Poppins', 
                fontSize: '14px',     
                color: '#666666',   
              },
            }}
          />

{/* Campo del formulario para cambiar la descripción */}
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
              height: '123px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& fieldset': {
                  borderColor: 'black', 
                },
                '&:hover fieldset': {
                  borderColor: 'black', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', 
                },
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Poppins', 
                fontSize: '14px',      
                color: '#666666',   
              },
            }}
          />
{ /*componente para la Subida de imagenes de la empresa */}
<SubidaImagenesAjustes onImageUpload={setImagenUrl} />


        <Typography variant="h4" component="h1" align="center"  sx={{ mr:24, mt:5,
          fontSize: '20px',
          fontFamily:'Poppins',
        }}>
          Perfil de mi empresa
        </Typography>

        {/* Campos del formulario para cambiar el nombre */}
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ mr: 8, mt:1,
  fontSize: '16px',
  fontFamily:'Poppins',
  whiteSpace: 'nowrap', 

  }}>
   Podras personalizar tu ID y compartir el link
  </Typography>

  <Typography variant="body1" align="center" sx={{ mr:10,
     fontSize: '16px',
     fontFamily:'Poppins',
  }}>
    de tu empresa con tus clientes. Para que tu
  </Typography>

  <Typography variant="body1" align="center" sx={{ mr: 15,
     fontSize: '16px',
     fontFamily:'Poppins',
  }}>
   empresa sea visible en la plataforma
  </Typography>

  <Typography variant="body1" align="center" sx={{ mr: 11, mb:2,
     fontSize: '16px',
     fontFamily:'Poppins',
     whiteSpace: 'nowrap', 
  }}>
    debaras tener marcada la opcion "online"
  </Typography>

</Box>

<Box display="flex" alignItems="center" sx={{ mb: 5,  backgroundColor: '#2E2F33',
    borderRadius: '12px',
    padding: '10px', width:'360px',
    height:'36px',
    }}>
    {/* Checkbox para mostrar la empresa online */}
  <Checkbox
    checked={mostrarOnline}
    onChange={(e) => setMostrarOnline(e.target.checked)}
    name="mostrarOnline"
    sx={{
      color: 'white', 
      '&.Mui-checked': {
        color: 'yellow', 
      },
      '& .MuiSvgIcon-root': {
        fontSize: '16px', 
      },
    }}
  />
  <Typography variant="body1" align="center"
  sx={{
    fontSize: '14px',
    fontFamily:'Inter',
  }}>
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
    
    mb: 2,
    height: '50px',
    width: '360px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '25px', 
      backgroundColor: 'white', 
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black', 
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black', 
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: 'Poppins', 
      fontSize: '14px',      
      color: '#666666',    
    },
  }}
/>
{}
<Typography variant="body1" align="center"  sx={{
    mt: 2,
    mb: 5,
    mr: 7,
    color: '#FFD000',
    fontSize: '16px',
    fontFamily:'Poppins',
    whiteSpace: 'nowrap', 
          
  }}>
    www.soyprofesional.com/miempresa

    {/* Botón para copiar el enlace de la empresa */}
    <IconButton onClick={handleCopyLink} sx={{ ml: 1, color:"#FFD000"}}>
            <ContentCopyIcon sx={{ fontSize: 22 }}/>
          </IconButton>
  </Typography>

  <Typography variant="h4" component="h1" align="center"  sx={{ mr:31, 
    fontSize: '20px',
    fontFamily:'Poppins',
  }}>
          Codigo QR
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ mr: 6, 
    fontSize: '16px',
    fontFamily:'Poppins',
  }}>
    Podras descargae una imagen QR del link de
  </Typography>

  <Typography variant="body1" align="center" sx={{ mr:7, mb:2,
    fontSize: '16px',
    fontFamily:'Poppins',
  }}>
    de tu empresa cpara utilizarla donde quieras 
  </Typography>
</Box>
{/* Código QR de la empresa */}

<div style={{ display: 'none' }} ref={qrRef}>
        <QRCode
          value="www.soyprofesional.com/miempresa"
          size={256}
          bgColor={'#ffffff'}
          fgColor={'#000000'}
          level={'L'}
          includeMargin={true}
        />
      </div>

<Typography variant="body1" align="center" sx={{  mb: 2, mr: 7, color:'#FFD000', 
  fontSize: '16px',
  fontFamily:'Poppins',
}}>
          Descargar imagen QR
          {/* Botón para descargar el código QR */}
          <IconButton onClick={handleDownloadQR} sx={{ ml: 13, color:"#FFD000 " }}>
            {/* Icono de descarga */}
            <DownloadIcon sx={{ fontSize: 22 }}/>
          </IconButton>
        </Typography>

        <Typography variant="h4" component="h1" align="center"  sx={{ mr:19,
          fontSize: '20px',
          fontFamily:'Poppins',
         }}>
          Señas con mercadopago
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ mr: 9,
    fontSize: '16px',
    fontFamily:'Poppins',
  }}>
    Podes vincular tu cuenta de mercadopago
  </Typography>

  <Typography variant="body1" align="center" sx={{ mr:8,
    fontSize: '16px',
    fontFamily:'Poppins',
  }}>
    podes exigirle a tus clientes dejar una seña
  </Typography>
  <Typography variant="body1" align="center" sx={{ mr:20, mb:2,
    fontSize: '16px',
    fontFamily:'Poppins',
  }}>
    antes de realizar una reserva 
  </Typography>
</Box>
{/* Botón para vincular la cuenta de MercadoPago */}
<Button
    variant="contained"
    color="primary"
    sx={{  mb:5, width: '360px', height:'43px', borderRadius: '30px', color: 'black',
       backgroundColor: '#FFD000', '&:hover': { backgroundColor: 'darkyellow' } }}
  >
    <Typography
    sx={{
      fontFamily: 'Poppins', 
      fontSize: '16px', 
      color: 'black', 
      textTransform: 'none', 
    }}
  >
    Vincular cuenta
  </Typography>
  </Button>

  <Typography variant="h4" component="h1" align="center"  sx={{ mr:23 , 
     fontFamily: 'Poppins',
      fontSize: '20px'
  }}>
          Configurar reservas 
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ mr: 7, mt:1,
     fontFamily: 'Poppins', 
      fontSize: '16px'
  }}>
    Elegi requisitos y configuracion de reservas 
  </Typography>
  
</Box>

  
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 2,  backgroundColor: '#2E2F33',
    borderRadius: '8px',
    width: '360px',
    height: '108px',
    }}>
      {/* Checkboxes para configurar las opciones de reserva */}
  <FormControlLabel
              control={
                <Checkbox
                  checked={opciones.opcion1}
                  onChange={handleOpcionesChange}
                  name="opcion1"
                  sx={{
                    color:'white',
                    '&.Mui-checked': {
                      color: '#FFD000', 
                    },
                    '& .MuiSvgIcon-root': {
          fontSize: '16px', 
        },
                  }}
                 
                />
              }
              label="Requiere autenticacion del cliente  "
              sx={{ mr: 13,
                '& .MuiTypography-root': {
                  fontFamily: 'Inter', 
                  fontSize: '14px',    
                  
                },
              
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                checked={opciones.opcion2}
                onChange={handleOpcionesChange}
                name="opcion2"
                sx={{
                  color:'white',
                  '&.Mui-checked': {
                    color: '#FFD000', 
                  },
                  '& .MuiSvgIcon-root': {
          fontSize: '16px', 
        },
                }}
               
              />
            }
            label="Requerir DNI del cliente "
            sx={{ mr: 20,
              '& .MuiTypography-root': {
                fontFamily: 'Inter', 
                fontSize: '14px',   
              },
             }}
            />
            <FormControlLabel
              control={
                <Checkbox
                checked={opciones.opcion3}
                onChange={handleOpcionesChange}
                name="opcion3"
                sx={{
                  color:'white',
                  '&.Mui-checked': {
                    color: '#FFD000', 
                  },
                  '& .MuiSvgIcon-root': {
          fontSize: '16px', 
        },
                }}
               
              />
            }
            label="Requerir Whatsapp del cliente"
            sx={{ mr: 16,
              '& .MuiTypography-root': {
                fontFamily: 'Inter', 
                fontSize: '14px',   
              },
            }}
            />
</Box>

{/* input para reprogramar turnos */}
<TextField
            label="Reprogrmacion de turnos permitida"
            type="text"
            variant="outlined"
            value={reprogramarTurnos}
            onChange={(e) => setReprogramarTurnos(e.target.value)}
            sx={{
              mt: 2,
              mb: 2,
              height: '50px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& fieldset': {
                  borderColor: 'black', 
                },
                '&:hover fieldset': {
                  borderColor: 'black', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', 
                },
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Poppins', 
                fontSize: '14px',      
                color: '#666666',    
              },
            }}
          />

{/* input para anticipacion de reserva */}
<TextField
            label="Hs minimas de anticipacion reserva"
            type="text"
            variant="outlined"
            value={anticipacionReserva}
            onChange={(e) => setAnticipacionReserva(e.target.value)}
            sx={{
              
              mb: 2,
              height: '50px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: 'black', 
                },
                '&:hover fieldset': {
                  borderColor: 'black', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', 
                },
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Poppins', 
                fontSize: '14px',      
                color: '#666666',    
              },
            }}
          />

{/* input para anticipacion de reprogramar */}
<TextField
            label="Hs minimas de anticipacion para reprogramar"
            type="text"
            variant="outlined"
            value={anticipacionReprogramar}
            onChange={(e) => setAnticipacionReprogramar(e.target.value)}
           
            sx={{
              
              mb: 5,
              height: '50px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& fieldset': {
                  borderColor: 'black', 
                },
                '&:hover fieldset': {
                  borderColor: 'black', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', 
                },
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Poppins', 
                fontSize: '14px',     
                color: '#666666',  
              },
            }}
          />  

<Typography variant="h4" component="h1" align="center"  sx={{ mr:28,
          fontSize: '20px',
          fontFamily:'Poppins',
}}>
          Redes sociales
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ mr: 13, mt:1,
     fontSize: '16px',
     fontFamily:'Poppins',
  }}>
    Ingresa el enlace a tus redes sociales 
  </Typography>
{ /*input para las redes sociales de la empresa */}
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
              height: '43px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: 'black', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', 
                },
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
              height: '43px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& fieldset': {
                  borderColor: 'black', 
                },
                '&:hover fieldset': {
                  borderColor: 'black', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', 
                },
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
              height: '43px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& fieldset': {
                  borderColor: 'black', 
                },
                '&:hover fieldset': {
                  borderColor: 'black', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', 
                },
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
              height: '43px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& fieldset': {
                  borderColor: 'black', 
                },
                '&:hover fieldset': {
                  borderColor: 'black', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', 
                },
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
              mb: 5,
              height: '43px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& fieldset': {
                  borderColor: 'black', 
                },
                '&:hover fieldset': {
                  borderColor: 'black', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
            }}
          />
</Box>

<Typography variant="h4" component="h1" align="center"  sx={{ mr:25 , 
  fontSize: '20px',
  fontFamily:'Poppins',
}}>
          Eliminar empresa
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ mr: 10, mt:1,
    fontSize: '16px',
    fontFamily:'Poppins',
    whiteSpace: 'nowrap',
  }}>
    Si eliminas tu empresa todos tus datos e 
  </Typography>
  <Typography variant="body1" align="center" sx={{ mr: 11,
    fontSize: '16px',
    fontFamily:'Poppins',
    whiteSpace: 'nowrap',
  }}>
    informacion se perderar y ya no podras 
  </Typography>
  
  <Typography variant="body1" align="center" sx={{ mr: 33,
    fontSize: '16px',
    fontFamily:'Poppins',
  }}>
    recuperarlos
  </Typography>

{/* Botón para eliminar la empresa */}
  <Button
    variant="contained"
    color="secondary"
    sx={{ mt: 2,mb:5, width: '360px',height:'43px', borderRadius: '30px',
       color: 'black', backgroundColor: '#FF8272', '&:hover': { backgroundColor: 'darkred' } }}
    onClick={() => alert('Empresa eliminada')}
  >
    <Typography
    sx={{
      fontFamily: 'Poppins',
      fontSize: '16px', 
      color: 'black', 
      textTransform: 'none',
    }}
  >
    Eliminar cuenta
  </Typography>
  </Button>
</Box>



          <Box display="flex" justifyContent="space-between" width="360px" >
            {/* Botón para cancelar */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'transparent',
                color: '#FFD000',
                borderRadius: '30px',
                border: '3px solid#FFD000',
                mb:3,
                height: '43px',
                
                width: '166px',
                '&:hover': {
                  backgroundColor: 'darkgrey',
                },
              }}
            >
               <Typography
    sx={{
      fontFamily: 'Poppins', 
      fontSize: '16px', 
      color: '#FFD000', 
      textTransform: 'none', 
    }}
  >
    Cancelar
  </Typography>
            </Button>
            {/* Botón para guardar los cambios */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#FFD000',
                color: 'black',
                borderRadius: '30px',
                ml: 1,
                mb:3,
                height: '43px',
                width: '166px',
                '&:hover': {
                  backgroundColor: 'darkgrey',
                },
              }}
            >
               <Typography
    sx={{
      fontFamily: 'Poppins', 
      fontSize: '16px', 
      color: 'black', 
      textTransform: 'none', 
    }}
  >
    Guardar
  </Typography>
            </Button>
          </Box>
        </form>
      </Box>
     
    </Box>

  </Box>
  );
};

export default AjustesEmpresa;