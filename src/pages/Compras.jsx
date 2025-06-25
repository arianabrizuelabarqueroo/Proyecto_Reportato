import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/custom.css';

const Compras = () => {
    const [compras, setCompras] = useState([
        {   id: 4,
            usuario: 2,
            proveedor: 2,
            fecha: '2024-03-10',
            producto: 2,
            precio: 1.5,
            cantidad: 8.0,
            total: 0.0
        }]);

    const [showModal, setShowModal] = useState(false);
    const [editingCompra, setEditingCompra] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
        
    const [formData, setFormData] = useState({
        usuario: '',
        proveedor: '',
        fecha: '',
        producto: '',
        precio: '',
        cantidad: '',
        total: ''
    });

    useEffect(() => {
          fetchCompras();
        }, []);
      
        const fetchCompras = async () => {
          try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/compras');
            if (response.ok) {
              const data = await response.json();
              setCompras(data);
            } else {
              console.error('Error al obtener las compras');
            }
          } catch (error) {
            console.error('Error:', error);
          } finally {
            setLoading(false);
          }
        };

    // Filtrar compras por búsqueda
    const filteredCompras = compras.filter(compras =>
        compras.usuario = searchTerm, 
        compras.proveedor = searchTerm
    );

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCompras = filteredCompras.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCompras.length / itemsPerPage);

    const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
        ...formData,
        [name]: value
    };

    // Calcular el total 
    const cantidad = parseFloat(name === "cantidad" ? value : updatedData.cantidad);
    const precio = parseFloat(name === "precio" ? value : updatedData.precio);

    if (!isNaN(cantidad) && !isNaN(precio)) {
        updatedData.total = (cantidad * precio).toFixed(2); // Redondea a 2 decimales
    } else {
        updatedData.total = '';
    }

    setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = editingCompra
                ? `http://localhost:3001/compras/${editingCompra.id}`
                : 'http://localhost:3001/compras';
            
            const method = editingCompra ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method: method,
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                await fetchCompras(); // Recargar la lista
                resetForm();
            } else {
                console.error('Error al guardar compra');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetForm = () => {
        setFormData({
        usuario: '',
        proveedor: '',
        fecha: '',
        producto: '',
        precio: '',
        cantidad: '',
        total: ''
        });
        setEditingCompra(null);
        setShowModal(false);
    };

    const handleEdit = (compras) => {
        setEditingCompra(compras);
        setFormData({
        usuario: compras.usuario,
        proveedor: compras.proveedor,
        fecha: compras.fecha,
        producto: compras.producto,
        precio: compras.precio,
        cantidad: compras.cantidad,
        total: compras.total
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta compra?')) {
            try {
                const response = await fetch(`http://localhost:3001/compras/${id}`, {
                method: 'DELETE',
                });

                if (response.ok) {
                await fetchCompras(); // Recargar la lista
                } else {
                console.error('Error al eliminar la compra');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES');
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
                        <i className="fas fa-star-half-stroke text-primary-purple me-2"></i>
                        Modulo de Compras
                        </h3>
                        <p className="text-muted mb-0">
                        Administra la informacion de las compras
                        </p>
                    </div>
                    <div className="d-flex gap-2">
                        <button 
                        className="btn btn-primary-purple"
                        onClick={() => setShowModal(true)}
                        >
                        <i className="fas fa-plus me-1"></i>
                        Nueva Compra
                        </button>
                    </div>
                    </div>
                </div>
                </div>

                {/* Tabla de Compras realizadas */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h5 className="card-title mb-0 fw-bold">Lista de Compras</h5>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="fas fa-search text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Buscar usuario o proveedor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 px-4 py-3">Usuario</th>
                        <th className="border-0 px-4 py-3">Proveedor</th>
                        <th className="border-0 px-4 py-3">Fecha de Registro</th>
                        <th className="border-0 px-4 py-3">Producto</th>
                        <th className="border-0 px-4 py-3">Precio Unitario</th>
                        <th className="border-0 px-4 py-3">Cantidad</th>
                        <th className="border-0 px-4 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCompras.map((compras) => (
                        <tr key={compras.id}>
                          <td className="px-4 py-3">
                            <div>
                              <div className="fw-medium text-dark">{compras.usuario}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="small text-dark">{compras.proveedor}</div>
                            </div>
                          </td> 
                          <td className="px-4 py-3">
                            <span className="small text-muted">
                              {formatDate(compras.fechaRegistro)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="small text-dark">{compras.producto}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="small text-dark">{compras.precio}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="fw-medium text-dark">{compras.cantidad}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="small text-dark">{compras.total}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(compras)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(compras.id)}
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
                      Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredCompras.length)} de {filteredCompras.length} compras
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
            {/* Modal para crear/editar Compra */}
            {showModal && (
            <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">
                    {editingCompra ? 'Editar compra' : 'Nueva compra'}
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
                        <label className="form-label">Ingrese el numero de usuario *</label>
                        <input
                            type="number"
                            className="form-control"
                            name="usuario"
                            value={formData.usuario}
                            onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                            required
                        />
                        </div>
                        <div className="col-md-6 mb-3">
                        <label className="form-label">Ingrese el numero de proveedor *</label>
                        <input
                            type="number"
                            className="form-control"
                            name="proveedor"
                            value={formData.proveedor}
                            onChange={handleInputChange}
                            required
                        />
                        </div>
                        <div className="col-12 mb-3">
                        <label className="form-label">Fecha de la compra *</label>
                        <input
                            type="date"
                            className="form-control"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleInputChange}
                            required
                        />
                        </div>
                        <div className="col-md-6 mb-3">
                        <label className="form-label">Ingrese el numero del producto *</label>
                        <input
                            type="number"
                            className="form-control"
                            name="producto"
                            value={formData.producto}
                            onChange={handleInputChange}
                            required
                        />
                        </div>
                        <div className="col-md-6 mb-3">
                        <label className="form-label">Ingrese la cantidad adquirida *</label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            name="cantidad"
                            value={formData.cantidad}
                            onChange={handleInputChange}
                            label= '10.00'
                            required
                        />
                        </div>
                        <div className="col-md-6 mb-3">
                        <label className="form-label">Ingrese el precio unitario *</label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            name="precio"
                            value={formData.precio}
                            onChange={handleInputChange}
                            label= '9.99'
                            required
                        />
                        </div>
                        <div className="col-md-6 mb-3">
                        <label className="form-label">Total de la compra</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.total}
                            readOnly
                        />
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
                            {editingCompra ? 'Actualizar' : 'Crear'} Compras
                        </button>
                        </div>
                        </div>
                    </form>
                </div>
                </div>
                </div>
        )}
        </div>
            
    );
};

export default Compras;