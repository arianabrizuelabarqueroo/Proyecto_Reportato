import React from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/home':
        return { title: 'Dashboard', subtitle: 'Panel de control principal' };
      case '/ventas':
        return { title: 'Ventas', subtitle: 'Administra tus ventas' };
      case '/compras':
        return { title: 'Compras', subtitle: 'Administra tus compras' };
      case '/inventario':
        return { title: 'Inventario', subtitle: 'Administra tu inventario' };
      case '/fidelizacion':
        return { title: 'Fidelización', subtitle: 'Administra tu programa de fidelización' };
      case '/proveedores':
        return { title: 'Proveedores', subtitle: 'Administra tus proveedores' };
      case '/cuentas-por-pagar':
        return { title: 'Cuentas por Pagar', subtitle: 'Administra las facturas de tus proveedores' };
      case '/productos':
        return { title: 'Productos', subtitle: 'Administra tus productos' };
      case '/usuario':
        return { title: 'Usuario', subtitle: 'Administra tu usuario' };
      case '/sucursales':
        return { title: 'Sucursales', subtitle: 'Administra tus sucursales' };
        case '/cuentas-por-cobrar':
        return { title: 'Cuentas por Cobrar', subtitle: 'Administra las facturas de tus clientes' };
      default:
        return { title: 'Dashboard', subtitle: 'Panel de control principal' };
    }
  };

  const { title, subtitle } = getPageTitle();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-bottom sticky-top">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center py-3">
          {/* Título de la página actual */}
          <div>
            <h4 className="mb-0 fw-bold text-dark">{title}</h4>
            <small className="text-muted">{subtitle}</small>
          </div>

          {/* Usuario y configuraciones */}
          <div className="d-flex align-items-center gap-3">
            {/* Dropdown del usuario */}
            <div className="dropdown">
              <button 
                className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border" 
                type="button" 
                id="userDropdown" 
                data-bs-toggle="dropdown"
              >
                <div className="bg-primary-orange rounded-circle p-2 text-white">
                  <i className="fas fa-user"></i>
                </div>
                <div className="text-start d-none d-md-block">
                  <div className="fw-semibold small">{user?.nombre || 'Usuario'}</div>
                  <div className="text-muted" style={{fontSize: '0.75rem'}}>
                    {user?.rol || 'Rol'}
                  </div>
                </div>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                <li>
                  <button className="dropdown-item py-2 text-danger" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
