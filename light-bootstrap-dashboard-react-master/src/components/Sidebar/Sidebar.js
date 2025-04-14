import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav, Dropdown } from "react-bootstrap";
import logo from "assets/img/logo.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img src={logo} alt="..." />
            </div>
          </a>
          <a className="simple-text">Reportato</a>
        </div>
        <Nav>
          {/* Rutas normales */}
          {routes.map((prop, key) => {
            if (
              !prop.redirect &&
              ![
                "/AlertasStockBajo",
                "/AsociacionProductosProveedores",
                "/HistorialInventario",
                "/InventarioDisponible",
                "/MovimientosInventario",
                "/RegistroProductos"
              ].includes(prop.path)
            )
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}

       
          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                className="nav-link text-white px-3"
                style={{
                  fontSize: "12px",
                  textAlign: "left",
                  width: "88%",
                  alignItems: "center"
                }}
              >
                <i className="nc-icon nc-notes mr-2" />
                <span style={{ fontSize: "12px" }}>Gestión Inventario</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark border-0 p-0 m-0">
                <Dropdown.Item
                  as={NavLink}
                  to="/admin/AlertasStockBajo"
                  className="text-white px-3 py-1"
                >
                  Alertas Stock Bajo
                </Dropdown.Item>
                <Dropdown.Item
                  as={NavLink}
                  to="/admin/AsociacionProductosProveedores"
                  className="text-white px-3 py-1"
                >
                  Asociación Productos Proveedores
                </Dropdown.Item>
                <Dropdown.Item
                  as={NavLink}
                  to="/admin/HistorialInventario"
                  className="text-white px-3 py-1"
                >
                  Historial Inventario
                </Dropdown.Item>
                <Dropdown.Item
                  as={NavLink}
                  to="/admin/InventarioDisponible"
                  className="text-white px-3 py-1"
                >
                  Inventario Disponible
                </Dropdown.Item>
                <Dropdown.Item
                  as={NavLink}
                  to="/admin/MovimientosInventario"
                  className="text-white px-3 py-1"
                >
                  Movimientos Inventario
                </Dropdown.Item>
                <Dropdown.Item
                  as={NavLink}
                  to="/admin/RegistroProductos"
                  className="text-white px-3 py-1"
                >
                  Registro Productos
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
