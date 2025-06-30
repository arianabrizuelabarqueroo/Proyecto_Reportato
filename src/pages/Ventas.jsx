import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/custom.css';

const VentasDiarias = () => {
  const [ventas, setVentas] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroSucursal, setFiltroSucursal] = useState('');

  const [formData, setFormData] = useState({
    sucursal_id: '',
    fecha_venta: new Date().toISOString().split('T')[0],
    venta_efectivo: '',
    venta_tarjeta: '',
    venta_sinpe: '',
    observaciones: '',
    estado: 'pendiente'
  });

  // Cargar datos desde la API
  useEffect(() => {
    fetchVentas();
    fetchSucursales();
    fetchEstadisticas();
  }, [filtroFecha, filtroSucursal]);

  const fetchVentas = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:3001/ventas-diarias';
      const params = new URLSearchParams();
      
      if (filtroFecha) {
        params.append('fecha_inicio', filtroFecha);
        params.append('fecha_fin', filtroFecha);
      }
      if (filtroSucursal) {
        params.append('sucursal_id', filtroSucursal);
      }
      
      if (params.toString()) {
        url += '?' + params.toString();
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setVentas(data);
      } else {
        console.error('Error al obtener ventas');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSucursales = async () => {
    try {
      const response = await fetch('http://localhost:3001/sucursales/activas');
      if (response.ok) {
        const data = await response.json();
        setSucursales(data);
      } else {
        console.error('Error al obtener sucursales');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchEstadisticas = async () => {
    try {
      let url = 'http://localhost:3001/ventas-diarias/estadisticas';
      const params = new URLSearchParams();
      
      if (filtroFecha) {
        params.append('fecha_inicio', filtroFecha);
        params.append('fecha_fin', filtroFecha);
      }
      
      if (params.toString()) {
        url += '?' + params.toString();
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setEstadisticas(data);
      }
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    }
  };

  // Filtrar ventas por búsqueda
  const filteredVentas = ventas.filter(item =>
    item.sucursal_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sucursal_tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.observaciones?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVentas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVentas.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingItem 
        ? `http://localhost:3001/ventas-diarias/${editingItem.id}`
        : 'http://localhost:3001/ventas-diarias';
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchVentas();
        await fetchEstadisticas();
        resetForm();
      } else {
        const error = await response.json();
        alert(error.message || 'Error al guardar venta');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar venta');
    }
  };

  const resetForm = () => {
    setFormData({
      sucursal_id: '',
      fecha_venta: new Date().toISOString().split('T')[0],
      venta_efectivo: '',
      venta_tarjeta: '',
      venta_sinpe: '',
      observaciones: '',
      estado: 'pendiente'
    });
    setEditingItem(null);
    setShowModal(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      sucursal_id: item.sucursal_id,
      fecha_venta: item.fecha_venta,
      venta_efectivo: item.venta_efectivo,
      venta_tarjeta: item.venta_tarjeta,
      venta_sinpe: item.venta_sinpe,
      observaciones: item.observaciones || '',
      estado: item.estado
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro de venta?')) {
      try {
        const response = await fetch(`http://localhost:3001/ventas-diarias/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchVentas();
          await fetchEstadisticas();
        } else {
          console.error('Error al eliminar venta');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/ventas-diarias/${id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: newStatus }),
      });

      if (response.ok) {
        await fetchVentas();
        await fetchEstadisticas();
      } else {
        console.error('Error al cambiar estado');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatCurrency = (amount) => {
    return `₡${parseFloat(amount || 0).toLocaleString('es-CR', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const getStatusBadgeClass = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-warning bg-opacity-20 text-warning';
      case 'confirmada':
        return 'bg-success bg-opacity-20 text-success';
      case 'cerrada':
        return 'bg-primary bg-opacity-20 text-primary';
      default:
        return 'bg-secondary bg-opacity-20 text-secondary';
    }
  };

  const getTipoBadgeClass = (tipo) => {
    switch (tipo) {
      case 'verdulería':
        return 'bg-primary-green bg-opacity-20 text-primary-green';
      case 'exportación':
        return 'bg-primary-purple bg-opacity-20 text-primary-purple';
      case 'feria':
        return 'bg-primary-orange bg-opacity-20 text-primary-orange';
      case 'mayorista':
        return 'bg-primary-blue bg-opacity-20 text-primary-blue';
      default:
        return 'bg-secondary bg-opacity-20 text-secondary';
    }
  };

  if (loading) {
    return (
      <div className="app-layout bg-light">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="content-area d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                      <i className="fas fa-cash-register text-primary-purple me-2"></i>
                      Ventas Diarias
                    </h3>
                    <p className="text-muted mb-0">
                      Registro de ventas por punto de venta
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary-green">
                      <i className="fas fa-download me-1"></i>
                      Exportar
                    </button>
                    <button 
                      className="btn btn-primary-purple"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Registrar Venta
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            {estadisticas && (
              <div className="row mb-4">
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
                          <div className="fw-bold text-dark fs-4">{formatCurrency(estadisticas.total_ventas)}</div>
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
                          <div className="avatar bg-primary-green bg-opacity-20 rounded-circle p-3">
                            <i className="fas fa-money-bill text-primary-green fs-4"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="fw-bold text-dark fs-4">{formatCurrency(estadisticas.total_efectivo)}</div>
                          <div className="text-muted small">Efectivo</div>
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
                            <i className="fas fa-credit-card text-primary-orange fs-4"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="fw-bold text-dark fs-4">{formatCurrency(estadisticas.total_tarjeta)}</div>
                          <div className="text-muted small">Tarjetas</div>
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
                            <i className="fas fa-mobile-alt text-primary-blue fs-4"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <div className="fw-bold text-dark fs-4">{formatCurrency(estadisticas.total_sinpe)}</div>
                          <div className="text-muted small">SINPE</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filtros */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="row align-items-end">
                  <div className="col-md-3 mb-3">
                    <label className="form-label small fw-medium">Filtrar por fecha</label>
                    <input
                      type="date"
                      className="form-control"
                      value={filtroFecha}
                      onChange={(e) => setFiltroFecha(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label small fw-medium">Filtrar por sucursal</label>
                    <select
                      className="form-select"
                      value={filtroSucursal}
                      onChange={(e) => setFiltroSucursal(e.target.value)}
                    >
                      <option value="">Todas las sucursales</option>
                      {sucursales.map((sucursal) => (
                        <option key={sucursal.id} value={sucursal.id}>
                          {sucursal.nombre} - {sucursal.tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label small fw-medium">Buscar</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="fas fa-search text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Buscar en ventas..."value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label small fw-medium text-white">.</label>
                    <button 
                      className="btn btn-outline-secondary w-100"
                      onClick={() => {
                        setFiltroFecha('');
                        setFiltroSucursal('');
                        setSearchTerm('');
                      }}
                    >
                      <i className="fas fa-times me-1"></i>
                      Limpiar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de ventas */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 fw-medium text-muted small px-4 py-3">Sucursal</th>
                        <th className="border-0 fw-medium text-muted small py-3">Fecha</th>
                        <th className="border-0 fw-medium text-muted small py-3">Efectivo</th>
                        <th className="border-0 fw-medium text-muted small py-3">Tarjeta</th>
                        <th className="border-0 fw-medium text-muted small py-3">SINPE</th>
                        <th className="border-0 fw-medium text-muted small py-3">Total</th>
                        <th className="border-0 fw-medium text-muted small py-3">Estado</th>
                        <th className="border-0 fw-medium text-muted small py-3">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3">
                              <div>
                                <div className="fw-medium text-dark">{item.sucursal_nombre}</div>
                                <div className="small">
                                  <span className={`badge ${getTipoBadgeClass(item.sucursal_tipo)} me-1`}>
                                    {item.sucursal_tipo}
                                  </span>
                                  <span className="text-muted">{item.sucursal_ubicacion}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3">
                              <div className="text-dark">{formatDate(item.fecha_venta)}</div>
                            </td>
                            <td className="py-3">
                              <div className="text-dark fw-medium">{formatCurrency(item.venta_efectivo)}</div>
                            </td>
                            <td className="py-3">
                              <div className="text-dark fw-medium">{formatCurrency(item.venta_tarjeta)}</div>
                            </td>
                            <td className="py-3">
                              <div className="text-dark fw-medium">{formatCurrency(item.venta_sinpe)}</div>
                            </td>
                            <td className="py-3">
                              <div className="text-dark fw-bold">{formatCurrency(item.venta_total)}</div>
                            </td>
                            <td className="py-3">
                              <div className="dropdown">
                                <span 
                                  className={`badge ${getStatusBadgeClass(item.estado)} dropdown-toggle`}
                                  style={{ cursor: 'pointer' }}
                                  data-bs-toggle="dropdown"
                                >
                                  {item.estado}
                                </span>
                                <ul className="dropdown-menu">
                                  <li>
                                    <button 
                                      className="dropdown-item" 
                                      onClick={() => handleChangeStatus(item.id, 'pendiente')}
                                    >
                                      Pendiente
                                    </button>
                                  </li>
                                  <li>
                                    <button 
                                      className="dropdown-item" 
                                      onClick={() => handleChangeStatus(item.id, 'confirmada')}
                                    >
                                      Confirmada
                                    </button>
                                  </li>
                                  <li>
                                    <button 
                                      className="dropdown-item" 
                                      onClick={() => handleChangeStatus(item.id, 'cerrada')}
                                    >
                                      Cerrada
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </td>
                            <td className="py-3">
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleEdit(item)}
                                  title="Editar"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(item.id)}
                                  title="Eliminar"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center py-5">
                            <div className="text-muted">
                              <i className="fas fa-inbox fa-3x mb-3 text-muted opacity-50"></i>
                              <div>No se encontraron registros de ventas</div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="card-footer bg-light border-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-muted small">
                        Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredVentas.length)} de {filteredVentas.length} registros
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
                            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para crear/editar */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingItem ? 'Editar Venta Diaria' : 'Registrar Venta Diaria'}
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
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Sucursal *</label>
                      <select
                        className="form-select"
                        name="sucursal_id"
                        value={formData.sucursal_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar sucursal</option>
                        {sucursales.map((sucursal) => (
                          <option key={sucursal.id} value={sucursal.id}>
                            {sucursal.nombre} - {sucursal.tipo}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha de Venta *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fecha_venta"
                        value={formData.fecha_venta}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Venta en Efectivo</label>
                      <div className="input-group">
                        <span className="input-group-text">₡</span>
                        <input
                          type="number"
                          className="form-control"
                          name="venta_efectivo"
                          value={formData.venta_efectivo}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Venta con Tarjeta</label>
                      <div className="input-group">
                        <span className="input-group-text">₡</span>
                        <input
                          type="number"
                          className="form-control"
                          name="venta_tarjeta"
                          value={formData.venta_tarjeta}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Venta SINPE</label>
                      <div className="input-group">
                        <span className="input-group-text">₡</span>
                        <input
                          type="number"
                          className="form-control"
                          name="venta_sinpe"
                          value={formData.venta_sinpe}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Estado</label>
                      <select
                        className="form-select"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmada">Confirmada</option>
                        <option value="cerrada">Cerrada</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Total</label>
                      <div className="input-group">
                        <span className="input-group-text">₡</span>
                        <input
                          type="text"
                          className="form-control bg-light"
                          value={formatCurrency(
                            (parseFloat(formData.venta_efectivo) || 0) +
                            (parseFloat(formData.venta_tarjeta) || 0) +
                            (parseFloat(formData.venta_sinpe) || 0)
                          )}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Observaciones</label>
                    <textarea
                      className="form-control"
                      name="observaciones"
                      value={formData.observaciones}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Observaciones adicionales..."
                    ></textarea>
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
                    className="btn btn-primary-purple"
                  >
                    {editingItem ? 'Actualizar' : 'Registrar'}
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

export default VentasDiarias;