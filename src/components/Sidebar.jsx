import React from "react";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: "fas fa-home",
      active: false,
      href: "home",
    },
    {
      title: "Ventas",
      icon: "fas fa-cart-shopping",
      active: false,
      href: "ventas"
    },
    {
      title: "Compras",
      icon: "fas fa-tag",
      active: false,
      href: "compras"
    },
    {
      title: "Inventario",
      icon: "fas fa-boxes",
      active: false,
      href: "inventario",
    },
    {
      title: "Proveedores",
      icon: "fas fa-truck-field",
      active: false,
      href: "proveedores",
    },
    {
      title: "Cuentas por Pagar",
      icon: "fas fa-file-invoice-dollar",
      active: false,
      href: "cuentas-por-pagar",
    },
     {
      title: 'Productos',
      icon: 'fas fa-lemon',
      active: false,
      href: 'productos'
    },
    {
      title: "Usuario",
      icon: "fas fa-user-shield",
      active: false,
      href: "usuario",
    },
    {
      title: "Sucursales",
      icon: "fas fa-location-dot",
      active: false,
      href: "sucursales",
    },
  ];

  return (
    <div className="sidebar bg-white shadow-sm border-end">
      {/* Logo y título */}
      <div className="sidebar-header p-4 border-bottom">
        <div className="d-flex align-items-center">
          <div className="bg-primary-orange rounded-3 p-2 me-3">
            <i className="fas fa-leaf text-white fs-4"></i>
          </div>
          <div>
            <h5 className="fw-bold mb-0 text-primary-orange">Reportato</h5>
            <small className="text-muted">Sistema de Gestión</small>
          </div>
        </div>
      </div>

      {/* Menú de navegación */}
      <nav className="sidebar-nav p-3">
        <ul className="nav flex-column gap-1">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a
                className={`nav-link d-flex align-items-center px-3 py-2 rounded-3 ${
                  item.active
                    ? "active bg-primary-orange text-white"
                    : "text-dark hover-bg-light"
                }`}
                href={item.href}
                data-bs-toggle={item.subItems ? "collapse" : ""}
                data-bs-target={item.subItems ? `#submenu${index}` : ""}
              >
                <i className={`${item.icon} me-3`}></i>
                <span className="flex-grow-1">{item.title}</span>
                {item.subItems && <i className="fas fa-chevron-down small"></i>}
              </a>

              {/* Submenú */}
              {item.subItems && (
                <div className="collapse" id={`submenu${index}`}>
                  <ul className="nav flex-column ms-4 mt-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className="nav-item">
                        <a
                          className="nav-link py-1 px-3 text-muted small hover-bg-light rounded-3"
                          href={subItem.href}
                        >
                          <i
                            className="fas fa-circle me-2"
                            style={{ fontSize: "0.5rem" }}
                          ></i>
                          {subItem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
