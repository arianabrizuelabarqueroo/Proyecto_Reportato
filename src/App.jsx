import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Fidelizacion from './pages/Fidelizacion';
import Ventas from './pages/Ventas';
import Inventario from './pages/Inventario';
import Proveedores from './pages/Proveedores';
import Usuario from './pages/Usuario';
import Productos from './pages/Productos';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/fidelizacion" element={<Fidelizacion />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/proveedores" element={<Proveedores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;