import React, { useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import axios from 'axios';

const SubidaImagenes = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const uploadImage = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', ''); // Reemplaza con tu upload preset

    setLoading(true);
    setError('');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/aca va el cloud name/image/upload', // Reemplaza con tu cloud name
        data
      );
      setUrl(res.data.secure_url);
    } catch (err) {
      setError('Error al subir la imagen. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CloudinaryContext cloudName=""> {/* Reemplaza con tu cloud name */}
      <div>
        <input type="file" onChange={uploadImage} />
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {url && <Image src={url} alt="Uploaded Image" />}
      </div>
    </CloudinaryContext>
  );
};

export default SubidaImagenes;