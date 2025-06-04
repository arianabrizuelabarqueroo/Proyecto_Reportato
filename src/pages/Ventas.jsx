import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/custom.css';

const Ventas = () => {
  const [ventas, setVentas] = useState([
    {
      id: 1,
      folio: 'V-001',
      cliente: 'María González',
      fecha: '2024-05-21',
      hora: '10:30',
      productos: [
        { nombre: 'Producto A', cantidad: 2, precio: 150.00 },
        { nombre: 'Producto B', cantidad: 1, precio: 200.00 }
      ],
      subtotal: 500.00,
      impuestos: 80.00,
      total: 580.00,
      estado: 'Completada',
      metodoPago: 'Efectivo'
    },
    {
      id: 2,
      folio: 'V-002',
      cliente: 'Carlos Rodríguez',
      fecha: '2024-05-21',
      hora: '11:15',
      productos: [
        { nombre: 'Producto C', cantidad: 3, precio: 100.00 }
      ],
      subtotal: 300.00,
      impuestos: 48.00,
      total: 348.00,
      estado: 'Completada',
      metodoPago: 'Tarjeta'
    },
    {
      id: 3,
      folio: 'V-003',
      cliente: 'Ana Martínez',
      fecha: '2024-05-20',
      hora: '15:45',
      productos: [
        { nombre: 'Producto A', cantidad: 1, precio: 150.00 },
        { nombre: 'Producto D', cantidad: 2, precio: 75.00 }
      ],
      subtotal: 300.00,
      impuestos: 48.00,
      total: 348.00,
      estado: 'Pendiente',
      metodoPago: 'Transferencia'
    }
  ]);

  const [productos] = useState([
    { id: 1, nombre: 'Producto A', precio: 150.00, stock: 25 },
    { id: 2, nombre: 'Producto B', precio: 200.00, stock: 15 },
    { id: 3, nombre: 'Producto C', precio: 100.00, stock: 30 },
    { id: 4, nombre: 'Producto D', precio: 75.00, stock: 20 }
  ]);

  const [clientes] = useState([
    'María González',
    'Carlos Rodríguez',
    'Ana Martínez',
    'Juan Pérez',
    'Laura López'
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingVenta, setEditingVenta] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [formData, setFormData] = useState({
    cliente: '',
    productos: [],
    metodoPago: 'Efectivo',
    estado: 'Completada'
  });

  const [carritoTemporal, setCarritoTemporal] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidadProducto, setCantidadProducto] = useState(1);

  // Filtrar ventas
  const filteredVentas = ventas.filter(venta => {
    const matchesSearch = 
      venta.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = !filterEstado || venta.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVentas = filteredVentas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVentas.length / itemsPerPage);

  const calcularTotales = (productosCarrito) => {
    const subtotal = productosCarrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const impuestos = subtotal * 0.16; // 16% IVA
    const total = subtotal + impuestos;
    return { subtotal, impuestos, total };
  };

  const agregarProductoCarrito = () => {
    if (!productoSeleccionado || cantidadProducto <= 0) return;
    
    const producto = productos.find(p => p.id === parseInt(productoSeleccionado));
    if (!producto) return;

    const productoExistente = carritoTemporal.find(item => item.id === producto.id);
    
    if (productoExistente) {
      setCarritoTemporal(prev => prev.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidadProducto }
          : item
      ));
    } else {
      setCarritoTemporal(prev => [...prev, {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidadProducto
      }]);
    }

    setProductoSeleccionado('');
    setCantidadProducto(1);
  };

  const eliminarProductoCarrito = (productId) => {
    setCarritoTemporal(prev => prev.filter(item => item.id !== productId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (carritoTemporal.length === 0) {
      alert('Debe agregar al menos un producto');
      return;
    }

    const { subtotal, impuestos, total } = calcularTotales(carritoTemporal);
    
    if (editingVenta) {
      // Actualizar venta existente
      setVentas(prev => prev.map(venta =>
        venta.id === editingVenta.id
          ? {
              ...venta,
              ...formData,
              productos: carritoTemporal,
              subtotal,
              impuestos,
              total
            }
          : venta
      ));
    } else {
      // Crear nueva venta
      const nuevaVenta = {
        id: Date.now(),
        folio: `V-${String(ventas.length + 1).padStart(3, '0')}`,
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        productos: carritoTemporal,
        subtotal,
        impuestos,
        total,
        ...formData
      };
      setVentas(prev => [...prev, nuevaVenta]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      cliente: '',
      productos: [],
      metodoPago: 'Efectivo',
      estado: 'Completada'
    });
    setCarritoTemporal([]);
    setEditingVenta(null);
    setShowModal(false);
    setProductoSeleccionado('');
    setCantidadProducto(1);
  };

  const handleEdit = (venta) => {
    setEditingVenta(venta);
    setFormData({
      cliente: venta.cliente,
      metodoPago: venta.metodoPago,
      estado: venta.estado
    });
    setCarritoTemporal(venta.productos);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta venta?')) {
      setVentas(prev => prev.filter(venta => venta.id !== id));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  const totalVentas = ventas.reduce((sum, venta) => sum + venta.total, 0);
  const ventasHoy = ventas.filter(venta => venta.fecha === new Date().toISOString().split('T')[0]);

  return (
    <div className="app-layout bg-light">
      <Sidebar />
      
      <div className="main-content">
        <Header />
        
        <div className="content-area">
          <div className="container-fluid p-4">
            {/* Header */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h3 className="fw-bold text-dark mb-1">
                      <i className="fas fa-shopping-cart text-primary-green me-2"></i>
                      Gestión de Ventas
                    </h3>
                    <p className="text-muted mb-0">
                      Administra las ventas de tu negocio
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary-green">
                      <i className="fas fa-download me-1"></i>
                      Exportar
                    </button>
                    <button 
                      className="btn btn-primary-green"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Nueva Venta
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="row mb-4">
              <div className="col-xl-3 col-md-6 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="avatar bg-primary-green bg-opacity-20 rounded-circle p-3">
                          <i className="fas fa-shopping-cart text-primary-green fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="fw-bold text-dark fs-4">{ventas.length}</div>
                        <div className="text-muted small">Total Ventas</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="avatar bg-primary-blue bg-opacity-20 rounded-circle p-3">
                          <i className="fas fa-calendar-day text-primary-blue fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="fw-bold text-dark fs-4">{ventasHoy.length}</div>
                        <div className="text-muted small">Ventas Hoy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="avatar bg-primary-orange bg-opacity-20 rounded-circle p-3">
                          <i className="fas fa-dollar-sign text-primary-orange fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="fw-bold text-dark fs-4">{formatCurrency(totalVentas)}</div>
                        <div className="text-muted small">Total Ingresos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="avatar bg-primary-purple bg-opacity-20 rounded-circle p-3">
                          <i className="fas fa-chart-line text-primary-purple fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="fw-bold text-dark fs-4">
                          {formatCurrency(ventasHoy.reduce((sum, venta) => sum + venta.total, 0))}
                        </div>
                        <div className="text-muted small">Ingresos Hoy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtros y búsqueda */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="fas fa-search text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Buscar por folio o cliente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3 mb-md-0">
                    <select
                      className="form-select"
                      value={filterEstado}
                      onChange={(e) => setFilterEstado(e.target.value)}
                    >
                      <option value="">Todos los estados</option>
                      <option value="Completada">Completada</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-outline-secondary w-100">
                      <i className="fas fa-filter me-1"></i>
                      Más Filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de ventas */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <h5 className="card-title mb-0 fw-bold">Lista de Ventas</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 px-4 py-3">Folio</th>
                        <th className="border-0 px-4 py-3">Cliente</th>
                        <th className="border-0 px-4 py-3">Fecha/Hora</th>
                        <th className="border-0 px-4 py-3">Productos</th>
                        <th className="border-0 px-4 py-3">Total</th>
                        <th className="border-0 px-4 py-3">Método Pago</th>
                        <th className="border-0 px-4 py-3">Estado</th>
                        <th className="border-0 px-4 py-3">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentVentas.map((venta) => (
                        <tr key={venta.id}>
                          <td className="px-4 py-3">
                            <span className="fw-medium text-primary-green">{venta.folio}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-dark">{venta.cliente}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="small text-dark">
                                {new Date(venta.fecha).toLocaleDateString('es-ES')}
                              </div>
                              <div className="small text-muted">{venta.hora}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="small">
                              {venta.productos.length} producto{venta.productos.length !== 1 ? 's' : ''}
                            </div>
                            <div className="small text-muted">
                              {venta.productos.reduce((sum, p) => sum + p.cantidad, 0)} unidades
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="fw-bold text-primary-green">
                              {formatCurrency(venta.total)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="small text-muted">{venta.metodoPago}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`badge ${
                              venta.estado === 'Completada' 
                                ? 'bg-success bg-opacity-20 text-success'
                                : venta.estado === 'Pendiente'
                                ? 'bg-warning bg-opacity-20 text-warning'
                                : 'bg-danger bg-opacity-20 text-danger'
                            }`}>
                              {venta.estado}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(venta)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-info"
                                title="Ver detalles"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(venta.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-between align-items-center p-4">
                    <div className="text-muted small">
                      Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredVentas.length)} de {filteredVentas.length} ventas
                    </div>
                    <nav>
                      <ul className="pagination pagination-sm mb-0">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Anterior
                          </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Siguiente
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para crear/editar venta */}
      {showModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingVenta ? 'Editar Venta' : 'Nueva Venta'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetForm}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    {/* Información de la venta */}
                    <div className="col-md-4">
                      <div className="card h-100">
                        <div className="card-header">
                          <h6 className="mb-0">Información de la Venta</h6>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <label className="form-label">Cliente *</label>
                            <select
                              className="form-select"
                              value={formData.cliente}
                              onChange={(e) => setFormData(prev => ({...prev, cliente: e.target.value}))}
                              required
                            >
                              <option value="">Seleccionar cliente</option>
                              {clientes.map((cliente, index) => (
                                <option key={index} value={cliente}>{cliente}</option>
                              ))}
                            </select>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Método de Pago</label>
                            <select
                              className="form-select"
                              value={formData.metodoPago}
                              onChange={(e) => setFormData(prev => ({...prev, metodoPago: e.target.value}))}
                            >
                              <option value="Efectivo">Efectivo</option>
                              <option value="Tarjeta">Tarjeta</option>
                              <option value="Transferencia">Transferencia</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <select
                              className="form-select"
                              value={formData.estado}
                              onChange={(e) => setFormData(prev => ({...prev, estado: e.target.value}))}
                            >
                              <option value="Completada">Completada</option>
                              <option value="Pendiente">Pendiente</option>
                              <option value="Cancelada">Cancelada</option>
                            </select>
                          </div>

                          {/* Resumen de totales */}
                          <div className="border-top pt-3">
                            <h6>Resumen</h6>
                            {(() => {
                              const { subtotal, impuestos, total } = calcularTotales(carritoTemporal);
                              return (
                                <>
                                  <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal:</span>
                                    <span>{formatCurrency(subtotal)}</span>
                                  </div>
                                  <div className="d-flex justify-content-between mb-2">
                                    <span>IVA (16%):</span>
                                    <span>{formatCurrency(impuestos)}</span>
                                  </div>
                                  <div className="d-flex justify-content-between fw-bold border-top pt-2">
                                    <span>Total:</span>
                                    <span className="text-primary-green">{formatCurrency(total)}</span>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Agregar productos */}
                    <div className="col-md-8">
                      <div className="card h-100">
                        <div className="card-header">
                          <h6 className="mb-0">Productos</h6>
                        </div>
                        <div className="card-body">
                          {/* Agregar producto */}
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <select
                                className="form-select"
                                value={productoSeleccionado}
                                onChange={(e) => setProductoSeleccionado(e.target.value)}
                              >
                                <option value="">Seleccionar producto</option>
                                {productos.map((producto) => (
                                  <option key={producto.id} value={producto.id}>
                                    {producto.nombre} - {formatCurrency(producto.precio)} (Stock: {producto.stock})
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-3">
                              <input
                                type="number"
                                className="form-control"
                                min="1"
                                value={cantidadProducto}
                                onChange={(e) => setCantidadProducto(parseInt(e.target.value) || 1)}
                                placeholder="Cantidad"
                              />
                            </div>
                            <div className="col-md-3">
                              <button
                                type="button"
                                className="btn btn-primary-green w-100"
                                onClick={agregarProductoCarrito}
                              >
                                <i className="fas fa-plus me-1"></i>
                                Agregar
                              </button>
                            </div>
                          </div>

                          {/* Lista de productos en el carrito */}
                          <div className="table-responsive">
                            <table className="table table-sm">
                              <thead className="bg-light">
                                <tr>
                                  <th>Producto</th>
                                  <th>Precio</th>
                                  <th>Cantidad</th>
                                  <th>Subtotal</th>
                                  <th>Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {carritoTemporal.map((item) => (
                                  <tr key={item.id}>
                                    <td>{item.nombre}</td>
                                    <td>{formatCurrency(item.precio)}</td>
                                    <td>{item.cantidad}</td>
                                    <td>{formatCurrency(item.precio * item.cantidad)}</td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => eliminarProductoCarrito(item.id)}
                                      >
                                        <i className="fas fa-trash"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {carritoTemporal.length === 0 && (
                              <div className="text-center text-muted py-4">
                                No hay productos agregados
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary-green"
                    disabled={carritoTemporal.length === 0}
                  >
                    {editingVenta ? 'Actualizar' : 'Crear'} Venta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;