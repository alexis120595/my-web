import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '20%',
  height: '200px'
};

const center = {
  lat: -32.889458,
  lng: -68.845839
};

const Mapa = () => {
  return (
    
    
      <LoadScript googleMapsApiKey="">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
  
  );
}

export default Mapa;