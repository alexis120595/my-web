import React from 'react';
import Home from './views/Home';

import {  Route, Routes} from 'react-router-dom';


function App () {
  return (
    
    <div>
      <Routes>
        
        <Route path="/" element={<Home />} />
        
        {/* Agrega más rutas según sea necesario */}
        
      </Routes>
    </div>
  
);
}
export default App;