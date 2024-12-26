import React, { useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import axios from 'axios';
import { Button, CircularProgress, Box, Typography } from '@mui/material';

const ImagenBarbero = ({ onImageUpload }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const uploadImage = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Proyecto'); // Reemplaza con tu upload preset

    setLoading(true);
    setError('');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dndrldskx/image/upload', // Reemplaza con tu cloud name
        data
      );
      setUrl(res.data.secure_url);
      onImageUpload(res.data.secure_url); // Llama a la función de callback con la URL de la imagen
    } catch (err) {
      setError('Error al subir la imagen. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
<CloudinaryContext cloudName="dndrldskx"> {/* Reemplaza con tu cloud name */}
<Box display="flex" justifyContent="flex-end" alignItems="center">
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-button"
          type="file"
          onChange={uploadImage}
        />
        <label htmlFor="upload-button">
          <Button
            variant="contained"
            component="span"
            sx={{
              borderRadius: '50%',
              width: '58px',
              height: '55px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#D9D9D9',
              color: 'white',
              mr: { xs: '0px', sm: '-40px' },
              mt:-10,
              
              
            }}
          >
           {loading ? (
  <CircularProgress  />
) : (
  <Typography
    sx={{
      fontSize: '12px',      // Tamaño de fuente para altura de 13px
      color: 'black',        // Color del texto
      width: '29px',         // Ancho del contenedor
      fontFamily: 'Popins',   // Fuente Popins
      textAlign: 'center',
      
    }}
  >
    Logo
  </Typography>
)}
          </Button>
        </label>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {url && <Image src={url} alt="Uploaded Image" style={{ borderRadius: '50%', marginTop: 16,
            width: '58px',
            height: '55px',
            objectFit: 'cover',
         }} />}
      </Box>
    </CloudinaryContext>
  );
};

export default ImagenBarbero;