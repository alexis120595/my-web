import React from 'react';
import Home from './views/Home';
import ViewsHoodie from './views/ViewsHoodie';
import {  Route, Routes} from 'react-router-dom';


function App () {
  return (
    
    <div>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/product/:id"element={<ViewsHoodie />} />
        {/* Agrega más rutas según sea necesario */}
        
      </Routes>
    </div>
  
);
}
export default App;