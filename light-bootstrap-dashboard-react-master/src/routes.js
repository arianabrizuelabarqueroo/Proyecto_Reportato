/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import SupplierList from "views/SupplierList.js";
import Upgrade from "views/Upgrade.js";
import Usuarios from "views/Usuarios.js";
import Roles from "views/Roles.js";
import LoyaltyModule from "views/LoyaltyModule.js";
import SalesRegister from "views/SalesRegister";
import AlertasStockBajo from "views/AlertasStockBajo";
import AsociacionProductosProveedores from "views/AsociacionProductosProveedores";
import HistorialInventario from "views/HistorialInventario";
import InventarioDisponible from "views/InventarioDisponible";
import MovimientosInventario from "views/MovimientosInventario";
import RegistroProductos from "views/RegistroProductos";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Perfil de Usuario",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/supplier",
    name: "Proveedores",
    icon: "nc-icon nc-notes",
    component: SupplierList,
    layout: "/admin"
  },
  {
    path: "/Usuarios",
    name: "Usuarios",
    icon: "nc-icon nc-circle-09",
    component: Usuarios,
    layout: "/admin"
  },
  {
    path: "/Roles",
    name: "Roles",
    icon: "nc-icon nc-circle-09",
    component: Roles,
    layout: "/admin"
 },
  {
    path: "/loyalty",
    name: "Modulo de lealtad",
    icon: "nc-icon nc-bell-55",
    component: LoyaltyModule,
    layout: "/admin"
  },
  {
    path: "/SalesRegister",
    name: "Registro de Ventas",
    icon: "nc-icon nc-bank",
    component: SalesRegister,
    layout: "/admin"
  },

   // SUBMENÚ GESTIÓN DE INVENTARIO
   {
    collapse: true,
    icon: "nc-icon nc-box",
    state: "gestionInventarioCollapse",
    views: [
      {
        path: "/AlertasStockBajo",
        name: "Alertas Stock Bajo",
        icon: "nc-icon nc-notes",
        component: AlertasStockBajo,
        layout: "/admin"
      },
      {
        path: "/AsociacionProductosProveedores",
        name: "Productos-Proveedores",
        icon: "nc-icon nc-notes",
        component: AsociacionProductosProveedores,
        layout: "/admin"
      },
      {
        path: "/HistorialInventario",
        name: "Historial Inventario",
        icon: "nc-icon nc-notes",
        component: HistorialInventario,
        layout: "/admin"
      },
      {
        path: "/InventarioDisponible",
        name: "Inventario Disponible",
        icon: "nc-icon nc-notes",
        component: InventarioDisponible,
        layout: "/admin"
      },
      {
        path: "/MovimientosInventario",
        name: "Movimientos Inventario",
        icon: "nc-icon nc-notes",
        component: MovimientosInventario,
        layout: "/admin"
      },
      {
        path: "/RegistroProductos",
        name: "Registro Productos",
        icon: "nc-icon nc-notes",
        component: RegistroProductos,
        layout: "/admin"
      }
    ]
  }  
]

export default dashboardRoutes;
