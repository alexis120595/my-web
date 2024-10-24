import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -32.889458,
  lng: -68.845839
};

const Mapa = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(center);

  const handleMapClick = async (event) => {
    const location = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    const address = await getGeocodedAddress(location);
    onLocationSelect(address);
    setMarkerPosition(location);
  };

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
    <LoadScript googleMapsApiKey="" loadingElement={<div>Loading...</div>}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Mapa;