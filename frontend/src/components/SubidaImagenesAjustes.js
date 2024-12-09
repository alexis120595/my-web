import React, { useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import axios from 'axios';
import { Button, CircularProgress, Box,Typography } from '@mui/material';

const SubidaImagenesAjustes = ({ onImageUpload }) => {
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
<Box display="flex" justifyContent="center" alignItems="center">
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
             {loading ? (
      <CircularProgress size={24} color="inherit" />
    ) : (
      <Typography
        sx={{
          fontFamily: 'Poppins', // Aplica la fuente Poppins
          fontSize: '14px', // Tamaño de fuente 14px
          color: 'black', // Asegura que el color del texto sea consistente
          textTransform: 'none', // Asegura que el texto no esté en mayúsculas
        }}
      >
        Cargá el logo de tu empresa
      </Typography>
    )}
          </Button>
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