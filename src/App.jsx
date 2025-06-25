import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Fidelizacion from './pages/Fidelizacion';
import Compras from './pages/Compras';
import Ventas from './pages/Ventas';
import Inventario from './pages/Inventario';
import Proveedores from './pages/Proveedores';
import Usuario from './pages/Usuario';
import Productos from './pages/Productos';
import Sucursales from './pages/Sucursales';
import Login from './pages/Login';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/fidelizacion" element={<Fidelizacion />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/proveedores" element={<Proveedores />} />
      </Routes>
    </BrowserRouter>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Navigate to="/home" replace />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute> 
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/clientes" element={
            <ProtectedRoute>
              <Clientes />
            </ProtectedRoute>
          } />
          <Route path="/fidelizacion" element={
            <ProtectedRoute>
              <Fidelizacion />
            </ProtectedRoute>
          } />
          <Route path="/ventas" element={
            <ProtectedRoute>
              <Ventas />
            </ProtectedRoute>
          } />
          <Route path="/inventario" element={
            <ProtectedRoute>
              <Inventario />
            </ProtectedRoute>
          } />
          <Route path="/usuario" element={
            <ProtectedRoute>
              <Usuario />
            </ProtectedRoute>
          } />
          <Route path="/productos" element={
            <ProtectedRoute>
              <Productos />
            </ProtectedRoute>
          } />
          <Route path="/proveedores" element={
            <ProtectedRoute>
              <Proveedores />
            </ProtectedRoute>
          } />
          <Route path="/sucursales" element={
            <ProtectedRoute>
              <Sucursales />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
