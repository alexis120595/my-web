// Archivo que contiene el mapa de Google Maps 
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

// Estilo del contenedor del mapa
const containerStyle = {
  width: '360px',
  height: '348px'
};

// Coordenadas del centro del mapa
const center = {
  lat: -32.889458,
  lng: -68.845839
};

// Componente que representa el mapa de Google Maps
const Mapa = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(center);
// Función que se ejecuta cuando se hace click en el mapa
  const handleMapClick = async (event) => {
    const location = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
// Obtiene la dirección de las coordenadas
    const address = await getGeocodedAddress(location);
    onLocationSelect(address);
    setMarkerPosition(location);
  };

  // Función que obtiene la dirección de las coordenadas
  const getGeocodedAddress = async (location) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`;
    try {
      const response = await axios.get(url);
      if (response.data && response.data.display_name) {
        return response.data.display_name;
      } else {
        return 'No results found';
      }
    } catch (error) {
      return 'Geocoder failed due to: ' + error.message;
    }
  };

  return (
    // Carga el script de Google Maps
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} loadingElement={<div>Loading...</div>}>
      {/* Crea el mapa de Google Maps */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        {/* Crea el marcador en el mapa */}
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Mapa;