// Archivo para subir imagenes a Cloudinary 
import React, { useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import axios from 'axios';
import { Button, CircularProgress, Box, Typography } from '@mui/material';

const SubidaImagenes = ({ onImageUpload }) => {
  // Estado para la URL de la imagen subida
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
// Función para subir la imagen a Cloudinary
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
        {/* Botón para subir la imagen */}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-button"
          type="file"
          onChange={uploadImage}
        />
        <label htmlFor="upload-button">
          {/* Botón de carga */}
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
              mr: { xs: '0px', sm: '180px' },
              mt:-8,
              
              
            }}
          >
           {loading ? (
  <CircularProgress  />
) : (
  <Typography
    sx={{
      fontSize: '12px',      
      color: 'black',        
      width: '29px',         
      fontFamily: 'Popins',  
      textAlign: 'center',
      
    }}
  >
    Logo
  </Typography>
)}
          </Button>
          {/* Texto del botón */}
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

export default SubidaImagenes;