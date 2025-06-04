import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/custom.css';

const Inventario = () => {
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: 'Manzanas Rojas',
      categoria: 'Frutas',
      stock: 50,
      stockMinimo: 10,
      precio: 2.50,
      proveedor: 'Frutas del Valle',
      fechaIngreso: '2024-05-15',
      fechaVencimiento: '2024-05-30',
      estado: 'Disponible'
    },
    {
      id: 2,
      nombre: 'Naranjas',
      categoria: 'Frutas',
      stock: 8,
      stockMinimo: 15,
      precio: 3.00,
      proveedor: 'Cítricos S.A.',
      fechaIngreso: '2024-05-10',
      fechaVencimiento: '2024-05-25',
      estado: 'Stock Bajo'
    },
    {
      id: 3,
      nombre: 'Plátanos',
      categoria: 'Frutas',
      stock: 25,
      stockMinimo: 20,
      precio: 1.80,
      proveedor: 'Tropical Fruits',
      fechaIngreso: '2024-05-18',
      fechaVencimiento: '2024-05-28',
      estado: 'Disponible'
    },
    {
      id: 4,
      nombre: 'Lechuga',
      categoria: 'Verduras',
      stock: 0,
      stockMinimo: 5,
      precio: 1.50,
      proveedor: 'Verduras Frescas',
      fechaIngreso: '2024-05-12',
      fechaVencimiento: '2024-05-22',
      estado: 'Agotado'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    stock: '',
    stockMinimo: '',
    precio: '',
    proveedor: '',
    fechaIngreso: '',
    fechaVencimiento: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');
  const [filterEstado, setFilterEstado] = useState('');

  const categorias = [...new Set(productos.map(p => p.categoria))];

  // Determinar estado del producto
  const determinarEstado = (stock, stockMinimo) => {
    if (stock === 0) return 'Agotado';
    if (stock <= stockMinimo) return 'Stock Bajo';
    return 'Disponible';
  };

  // Filtrar productos
  const productosFiltrados = productos.filter(producto => {
    const matchSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       producto.proveedor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategoria = filterCategoria === '' || producto.categoria === filterCategoria;
    const matchEstado = filterEstado === '' || producto.estado === filterEstado;
    return matchSearch && matchCategoria && matchEstado;
  });

  // Calcular estadísticas
  const totalProductos = productos.length;
  const productosDisponibles = productos.filter(p => p.estado === 'Disponible').length;
  const productosStockBajo = productos.filter(p => p.estado === 'Stock Bajo').length;
  const productosAgotados = productos.filter(p => p.estado === 'Agotado').length;
  const valorInventario = productos.reduce((sum, p) => sum + (p.stock * p.precio), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const stock = parseInt(formData.stock);
    const stockMinimo = parseInt(formData.stockMinimo);
    const estado = determinarEstado(stock, stockMinimo);
    
    if (editingProducto) {
      setProductos(productos.map(producto => 
        producto.id === editingProducto.id 
          ? { 
              ...producto, 
              ...formData, 
              stock, 
              stockMinimo, 
              precio: parseFloat(formData.precio),
              estado 
            }
          : producto
      ));
    } else {
      const newProducto = {
        id: Date.now(),
        ...formData,
        stock,
        stockMinimo,
        precio: parseFloat(formData.precio),
        estado
      };
      setProductos([...productos, newProducto]);
    }
    
    resetForm();
  };

  const handleEdit = (producto) => {
    setEditingProducto(producto);
    setFormData({
      nombre: producto.nombre,
      categoria: producto.categoria,
      stock: producto.stock.toString(),
      stockMinimo: producto.stockMinimo.toString(),
      precio: producto.precio.toString(),
      proveedor: producto.proveedor,
      fechaIngreso: producto.fechaIngreso,
      fechaVencimiento: producto.fechaVencimiento
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProductos(productos.filter(producto => producto.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      categoria: '',
      stock: '',
      stockMinimo: '',
      precio: '',
      proveedor: '',
      fechaIngreso: '',
      fechaVencimiento: ''
    });
    setEditingProducto(null);
    setShowModal(false);
  };

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case 'Disponible': return 'bg-success';
      case 'Stock Bajo': return 'bg-warning';
      case 'Agotado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

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
                      <i className="fas fa-boxes me-2 text-primary-blue"></i>
                      Gestión de Inventario
                    </h3>
                    <p className="text-muted mb-0">Controla tu stock y productos</p>
                  </div>
                  <button 
                    className="btn btn-primary-blue"
                    onClick={() => setShowModal(true)}
                  >
                    <i className="fas fa-plus me-1"></i>
                    Nuevo Producto
                  </button>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-primary-blue bg-opacity-10 rounded-circle p-3">
                          <i className="fas fa-box text-primary-blue fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="fw-bold text-dark fs-4">{totalProductos}</div>
                        <div className="text-muted small">Total Productos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-success bg-opacity-10 rounded-circle p-3">
                          <i className="fas fa-check-circle text-success fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="fw-bold text-dark fs-4">{productosDisponibles}</div>
                        <div className="text-muted small">Disponibles</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-warning bg-opacity-10 rounded-circle p-3">
                          <i className="fas fa-exclamation-triangle text-warning fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="fw-bold text-dark fs-4">{productosStockBajo}</div>
                        <div className="text-muted small">Stock Bajo</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-primary-green bg-opacity-10 rounded-circle p-3">
                          <i className="fas fa-dollar-sign text-primary-green fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="fw-bold text-dark fs-4">${valorInventario.toFixed(2)}</div>
                        <div className="text-muted small">Valor Total</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas */}
            {productosStockBajo > 0 && (
              <div className="alert alert-warning border-0 shadow-sm mb-4">
                <div className="d-flex align-items-center">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  <strong>Atención:</strong> Tienes {productosStockBajo} producto(s) con stock bajo.
                </div>
              </div>
            )}

            {productosAgotados > 0 && (
              <div className="alert alert-danger border-0 shadow-sm mb-4">
                <div className="d-flex align-items-center">
                  <i className="fas fa-times-circle me-2"></i>
                  <strong>Urgente:</strong> Tienes {productosAgotados} producto(s) agotado(s).
                </div>
              </div>
            )}

            {/* Filtros y búsqueda */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="fas fa-search text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <select
                      className="form-select"
                      value={filterCategoria}
                      onChange={(e) => setFilterCategoria(e.target.value)}
                    >
                      <option value="">Todas las categorías</option>
                      {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <select
                      className="form-select"
                      value={filterEstado}
                      onChange={(e) => setFilterEstado(e.target.value)}
                    >
                      <option value="">Todos los estados</option>
                      <option value="Disponible">Disponible</option>
                      <option value="Stock Bajo">Stock Bajo</option>
                      <option value="Agotado">Agotado</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-outline-primary-green w-100">
                      <i className="fas fa-download me-1"></i>
                      Exportar
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-outline-primary-orange w-100">
                      <i className="fas fa-print me-1"></i>
                      Imprimir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de productos */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <h5 className="card-title mb-0 fw-bold">Lista de Productos</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 fw-bold">Producto</th>
                        <th className="border-0 fw-bold">Categoría</th>
                        <th className="border-0 fw-bold">Stock</th>
                        <th className="border-0 fw-bold">Stock Mín.</th>
                        <th className="border-0 fw-bold">Precio</th>
                        <th className="border-0 fw-bold">Proveedor</th>
                        <th className="border-0 fw-bold">Vencimiento</th>
                        <th className="border-0 fw-bold">Estado</th>
                        <th className="border-0 fw-bold">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productosFiltrados.map(producto => (
                        <tr key={producto.id}>
                          <td className="fw-medium">{producto.nombre}</td>
                          <td>
                            <span className="badge bg-light text-dark">{producto.categoria}</span>
                          </td>
                          <td>
                            <span className={`fw-bold ${
                              producto.stock === 0 ? 'text-danger' : 
                              producto.stock <= producto.stockMinimo ? 'text-warning' : 
                              'text-success'
                            }`}>
                              {producto.stock}
                            </span>
                          </td>
                          <td>{producto.stockMinimo}</td>
                          <td className="fw-bold">${producto.precio.toFixed(2)}</td>
                          <td className="text-muted">{producto.proveedor}</td>
                          <td>
                            {new Date(producto.fechaVencimiento) < new Date() ? (
                              <span className="text-danger fw-bold">
                                {new Date(producto.fechaVencimiento).toLocaleDateString('es-ES')}
                              </span>
                            ) : (
                              new Date(producto.fechaVencimiento).toLocaleDateString('es-ES')
                            )}
                          </td>
                          <td>
                            <span className={`badge ${getEstadoBadgeClass(producto.estado)}`}>
                              {producto.estado}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(producto)}
                                title="Editar"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-success"
                                title="Reabastecer"
                                onClick={() => {
                                  const cantidad = prompt('¿Cuántas unidades deseas agregar?');
                                  if (cantidad && !isNaN(cantidad)) {
                                    const newStock = producto.stock + parseInt(cantidad);
                                    const newEstado = determinarEstado(newStock, producto.stockMinimo);
                                    setProductos(productos.map(p => 
                                      p.id === producto.id 
                                        ? { ...p, stock: newStock, estado: newEstado }
                                        : p
                                    ));
                                  }
                                }}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(producto.id)}
                                title="Eliminar"
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
                {productosFiltrados.length === 0 && (
                  <div className="text-center py-5">
                    <i className="fas fa-search fs-1 text-muted mb-3"></i>
                    <h5 className="text-muted">No se encontraron productos</h5>
                    <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para crear/editar producto */}
      {showModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">
                  {editingProducto ? 'Editar Producto' : 'Nuevo Producto'}
                </h5>
                <button type="button" className="btn-close" onClick={resetForm}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Nombre del Producto</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej: Manzanas Rojas"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Categoría</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej: Frutas, Verduras"
                        value={formData.categoria}
                        onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-medium">Stock Actual</label>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-medium">Stock Mínimo</label>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        value={formData.stockMinimo}
                        onChange={(e) => setFormData({...formData, stockMinimo: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-medium">Precio Unitario</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        min="0"
                        value={formData.precio}
                        onChange={(e) => setFormData({...formData, precio: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-medium">Proveedor</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre del proveedor"
                        value={formData.proveedor}
                        onChange={(e) => setFormData({...formData, proveedor: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Fecha de Ingreso</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.fechaIngreso}
                        onChange={(e) => setFormData({...formData, fechaIngreso: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Fecha de Vencimiento</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.fechaVencimiento}
                        onChange={(e) => setFormData({...formData, fechaVencimiento: e.target.value})}
                        required
                      />
                    </div>
                    {formData.stock && formData.stockMinimo && (
                      <div className="col-12">
                        <div className={`alert ${
                          parseInt(formData.stock) === 0 ? 'alert-danger' :
                          parseInt(formData.stock) <= parseInt(formData.stockMinimo) ? 'alert-warning' :
                          'alert-success'
                        }`}>
                          <strong>Estado: {determinarEstado(parseInt(formData.stock || 0), parseInt(formData.stockMinimo || 0))}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary-blue">
                    {editingProducto ? 'Actualizar' : 'Crear'} Producto
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

export default Inventario;