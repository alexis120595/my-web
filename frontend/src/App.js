import React from 'react';
import Home from './views/Home';
import Reserva from './views/Reserva';
import Detalle from './views/Detalle';
import {  Route, Routes} from 'react-router-dom';


function App () {
  return (
    
    <div>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/reservas" element={<Reserva />} />
        <Route path="/detalle" element={<Detalle />} />
        
        {/* Agrega más rutas según sea necesario */}
        
      </Routes>
    </div>
  
);
}
export default App;