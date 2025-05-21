import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-bottom sticky-top">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center py-3">
          {/* Título de la página actual */}
          <div>
            <h4 className="mb-0 fw-bold text-dark">Dashboard</h4>
            <small className="text-muted">Panel de control principal</small>
          </div>

          {/* Usuario y configuraciones */}
          <div className="d-flex align-items-center gap-3">
            {/* Notificaciones */}
            <div className="position-relative">
              <button className="btn btn-light btn-sm rounded-circle p-2">
                <i className="fas fa-bell text-primary-orange"></i>
              </button>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-orange small">
                3
              </span>
            </div>

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
                  <div className="fw-semibold small">Juan Pérez</div>
                  <div className="text-muted" style={{fontSize: '0.75rem'}}>Administrador</div>
                </div>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                <li>
                  <a className="dropdown-item py-2" href="#">
                    <i className="fas fa-user-circle me-2 text-muted"></i>
                    Mi Perfil
                  </a>
                </li>
                <li>
                  <a className="dropdown-item py-2" href="#">
                    <i className="fas fa-cog me-2 text-muted"></i>
                    Configuración
                  </a>
                </li>
                <li>
                  <a className="dropdown-item py-2" href="#">
                    <i className="fas fa-question-circle me-2 text-muted"></i>
                    Ayuda
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a className="dropdown-item py-2 text-danger" href="#">
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Cerrar Sesión
                  </a>
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