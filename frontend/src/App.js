import React from 'react';
import Home from './views/Home';
import Reserva from './views/Reserva';
import Detalle from './views/Detalle';
import Registro from './views/Registro';
import {  Route, Routes} from 'react-router-dom';


function App () {
  return (
    
    <div>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/reservas" element={<Reserva />} />
        <Route path="/detalle" element={<Detalle />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* Agrega más rutas según sea necesario */}
        
      </Routes>
    </div>
  
);
}
export default App;