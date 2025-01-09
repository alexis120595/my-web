// # Este archivo contiene el componente principal de la aplicación React.
// # Se importan los diferentes componentes y vistas que componen la aplicación.
// # Se utiliza react-router-dom para configurar las rutas y asociarlas a componentes específicos.
// # <Header /> representa la cabecera que se muestra en la parte superior de la aplicación.
// # <Layout /> permite envolver la estructura principal de la aplicación, incluidas las rutas.

import React from 'react';
import Home from './views/Home';
import Reserva from './views/Reserva';
import Detalle from './views/Detalle';
import Registro from './views/Registro';
import InicioDeSesion from './views/InicioDeSesion';
import CrearServicio from './views/CrearServicio';
import Opciones from './views/Opciones';
import {  Route, Routes} from 'react-router-dom';
import BuscarEmpresa from './views/BuscarEmpresa';
import MiEmpresa from './views/MiEmpresa';
import AgendaEmpresa from './views/AgendaEmpresa';
import ServiciosDisponibles from './views/ServiciosDisponibles';
import CrearServicio1 from './views/CrearServicio1';
import Personal from './views/Personal';
import CrearEmpleado from './views/CrearEmpleado';
import Clientes from './views/Clientes';
import Sucursales from './views/Sucursales';
import CrearSucursal from './views/CrearSucursal';
import AjustesEmpresa from './views/AjustesEmpresa';
import CrearHorarios from './views/CrearHorarios';
import Header from './components/Header';
import CrearCategoria from './views/CrearCategoria';
import AñadirProfesional from './views/AñadirProfesional';
import EditarProfesional from './views/EditarProfesional';
import PersonalizarServicio from './views/PersonalizarServicio';
import DetalleReservaEmpresa from './views/DetalleReservaEmpresa';
import EditarServicio from './views/EditarServicio';
import EditarSucursal from './views/EditarSucursal';
import ReservaExitosa from './views/ReservaExitosa';
import ReservasUsuario from './views/ReservasUsuario';
import Layout from './components/Layout';
function App () {
  return (
    
    <div>
            {/* # Se coloca Header en la parte superior de la aplicación */}
      <Header />
        {/* # Layout envuelve las rutas de la aplicación para proporcionar una estructura consistente */}
        
      <Layout>
      <Routes>
         {/* # Cada Route asocia una URL específica con un componente de la carpeta views */}
        <Route path="/home" element={<Home />} />
        <Route path="/reservas" element={<Reserva />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<InicioDeSesion />} />
        <Route path="/crear-servicio" element={<CrearServicio />} />
        <Route path="/opciones" element={<Opciones/>} />
        <Route path="/buscar-empresa" element={<BuscarEmpresa />} />
        <Route path="/mi-empresa/:empresaId" element={<MiEmpresa/>} />
        <Route path="/agenda-empresa" element={<AgendaEmpresa/>} />
        <Route path="/servicios-disponibles" element={<ServiciosDisponibles/>} />
        <Route path="/crear-servicio1" element={<CrearServicio1/>} />
        <Route path="/personal" element={<Personal/>} />
        <Route path="/crear-empleado" element={<CrearEmpleado/>} />
        <Route path="/clientes" element={<Clientes/>} />
        <Route path="/sucursales" element={<Sucursales/>} />
        <Route path="/crear-sucursal" element={<CrearSucursal/>} />
        <Route path="/ajustes-empresa" element={<AjustesEmpresa/>} />
        <Route path="/crear-horarios" element={<CrearHorarios/>} />
        <Route path="/crear-categoria" element={<CrearCategoria/>} />
        <Route path="/añadir-profesional" element={<AñadirProfesional/>} />
        <Route path="/editar-profesional/:id" element={<EditarProfesional/>} />
        <Route path="/personalizar-servicio" element={<PersonalizarServicio/>} />
        <Route path="/detalle-reserva-empresa/:id" element={<DetalleReservaEmpresa/>} />
        <Route path="/editar-servicio/:id" element={<EditarServicio/>} />
        <Route path="/editar-sucursal/:id" element={<EditarSucursal/>} />
        <Route path="/reserva-exitosa" element={<ReservaExitosa/>} />
        <Route path="/reservas-usuario" element={<ReservasUsuario/>} />
       
      
       
      
        
        {/* Agrega más rutas según sea necesario */}
        
      </Routes>
      </Layout>
    </div>
  
);
}
export default App;