// componente para subir imagenes a cloudinary en los ajustes de la empresa
import React, { useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import axios from 'axios';
import { Button, CircularProgress, Box,Typography } from '@mui/material';

const SubidaImagenesAjustes = ({ onImageUpload }) => {
  // estados para la URL de la imagen, el estado de carga y los errores
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
// función para subir la imagen a Cloudinary
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
<Box display="flex" justifyContent="center" alignItems="center">

        { /* Botón para subir la imagen */ }
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-button"
          type="file"
          onChange={uploadImage}
        />
        <label htmlFor="upload-button">
          {/* Botón de carga de imagen */}
          <Button
            variant="contained"
            component="span"
            sx={{
              borderRadius: '8px',
              width: '360px',
              height: '144px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              color: 'black',
              mr:1,
              mt:2,
               
            }}
          >
            {/* Contenido del botón */}
             {loading ? (
      <CircularProgress size={24} color="inherit" />
    ) : (
      <Typography
        sx={{
          fontFamily: 'Poppins', 
          fontSize: '14px', 
          color: 'black', 
          textTransform: 'none', 
        }}
      >
        Cargá el logo de tu empresa
      </Typography>
    )}
    
          </Button>
          {/* Texto de ayuda */}
        </label>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {url && <Image src={url} alt="Uploaded Image" style={{ borderRadius: '50%', marginTop: 16,  width: '100px',
            height: '100px',
            objectFit: 'cover', }} />}
      </Box>
    </CloudinaryContext>
  );
};

export default SubidaImagenesAjustes;