import React from 'react';
import Home from './views/Home';
import Reserva from './views/Reserva';
import Detalle from './views/Detalle';
import Registro from './views/Registro';
import InicioDeSesion from './views/InicioDeSesion';
import CrearServicio from './views/CrearServicio';
import {  Route, Routes} from 'react-router-dom';


function App () {
  return (
    
    <div>
      <Routes>
        
        <Route path="/home" element={<Home />} />
        <Route path="/reservas" element={<Reserva />} />
        <Route path="/detalle" element={<Detalle />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<InicioDeSesion />} />
        <Route path="/crear-servicio" element={<CrearServicio />} />
        
        {/* Agrega más rutas según sea necesario */}
        
      </Routes>
    </div>
  
);
}
export default App;