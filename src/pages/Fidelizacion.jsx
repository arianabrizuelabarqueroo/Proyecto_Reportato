import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/custom.css';
import Clientes from '../pages/Clientes';

const Fidelizacion = () => {
  const [fidelizacion, setFidelizacion] = useState([
    {
      id: 1,
      usuario: 3,
      folio: 'V-003',
      cliente: 'Ana Martínez',
      fechaRegistro: '2024-03-10',
      categoria: 'bronce'
    },
    {
      id: 2,
      usuario: 1,
      folio: 'V-001',
      cliente: 'María González',
      fechaRegistro: '2024-01-15',
      categoria: 'oro'
    },
    {
      id: 3,
      usuario: 2,
      folio: 'V-002',
      cliente: 'Carlos Rodríguez',
      fechaRegistro: '2024-02-20',
      categoria: 'plata'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingFidelizacion, setEditingFidelizacion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    folio: '',
    cliente: '',
    categoria: ''
  });

  // Cargar usuarios_fideliacion desde la API
    useEffect(() => {
      fetchFidelizacion();
    }, []);
  
    const fetchFidelizacion = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/fidelizacion');
        if (response.ok) {
          const data = await response.json();
          setFidelizacion(data);
        } else {
          console.error('Error al obtener los usuarios');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

  // Filtrar fidelizacion por búsqueda
  const filteredFidelizacion = fidelizacion.filter(fidelizacion =>
    fidelizacion.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fidelizacion.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fidelizacion.categoria.includes(searchTerm)
  );

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFidelizacion = filteredFidelizacion.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFidelizacion.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Buscar el cliente por nombre ingresado en el formulario
  const clienteId = buscarClientePorNombre(formData.cliente);

  if (!clienteId) {
    alert('Cliente no encontrado');
    return;
  }

  try {
      const url = editingFidelizacion 
        ? `http://localhost:3001/fidelizacion/${editingFidelizacion.id}`
        : 'http://localhost:3001/fidelizacion';
      
      const method = editingFidelizacion ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchFidelizacion(); // Recargar la lista
        resetForm();
      } else {
        console.error('Error al guardar producto');
      }
    } catch (error) {
      console.error('Error:', error);
    }
/* EDICION SIN BASE DE DATOS
if (editingFidelizacion) {
    // Actualizar fidelización existente
    setFidelizacion(prev => prev.map(fidelizacion =>
      fidelizacion.id === editingFidelizacion.id
        ? { ...fidelizacion, ...formData, usuario: clienteId }
        : fidelizacion
    ));
  } else {
    // Crear nueva fidelización
    const newFidelizacion = {
      id: Date.now(),
      ...formData,
      usuario: clienteId, // Aquí se guarda el objeto cliente encontrado
      fechaRegistro: new Date().toISOString().split('T')[0],
    };
    setFidelizacion(prev => [...prev, newFidelizacion]);
  }

  resetForm();
*/

};

  const resetForm = () => {
    setFormData({
      folio: '',
      cliente: '',
      categoria: ''
    });
    setEditingFidelizacion(null);
    setShowModal(false);
  };

  const handleEdit = (fidelizacion) => {
    setEditingFidelizacion(fidelizacion);
    setFormData({
      id: fidelizacion.id,
      usuario: fidelizacion.usuario,
      folio: fidelizacion.folio,
      cliente: fidelizacion.cliente,
      fechaRegistro: fidelizacion.fechaRegistro,
      categoria: fidelizacion.categoria
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        const response = await fetch(`http://localhost:3001/fidelizacion/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchFidelizacion(); // Recargar la lista
        } else {
          console.error('Error al eliminar usuario');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    /*
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      setFidelizacion(prev => prev.filter(fidelizacion => fidelizacion.id !== id));
    }
    */
  };

  const buscarClientePorNombre = (nombreBuscado) => {
  return Clientes.find(Clientes => Clientes.nombre.toLowerCase() === nombreBuscado.toLowerCase());
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
                      Gestión de Usuarios de afiliados
                    </h3>
                    <p className="text-muted mb-0">
                      Administra la información de los Usuarios
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
                      Nuevo Usuario
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas }
            <div className="row mb-4">
              <div className="col-xl-3 col-md-6 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="avatar bg-primary-purple bg-opacity-20 rounded-circle p-3">
                          <i className="fas fa-users text-primary-purple fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="fw-bold text-dark fs-4">{fidelizacion.length}</div>
                        <div className="text-muted small">Total Afiliados</div>
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
                          <i className="fas fa-user-check text-primary-green fs-4"></i>
                        </div>
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
                          <i className="fas fa-calendar-plus text-primary-orange fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="fw-bold text-dark fs-4">
                          {fidelizacion.filter(c => {
                            const fechaRegistro = new Date(c.fechaRegistro);
                            const mesActual = new Date();
                            return fechaRegistro.getMonth() === mesActual.getMonth();
                          }).length}
                        </div>
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
                          <i className="fas fa-dollar-sign text-primary-blue fs-4"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de usuarios afiliados */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h5 className="card-title mb-0 fw-bold">Lista de Usuarios</h5>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="fas fa-search text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Buscar usuario..."
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
                        <th className="border-0 px-4 py-3">Cliente</th>
                        <th className="border-0 px-4 py-3">Folios</th>
                        <th className="border-0 px-4 py-3">Fecha de Registro</th>
                        <th className="border-0 px-4 py-3">Categoria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentFidelizacion.map((fidelizacion) => (
                        <tr key={fidelizacion.id}>
                          <td className="px-4 py-3">
                            <div>
                              <div className="fw-medium text-dark">{fidelizacion.cliente}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="small text-dark">{fidelizacion.folio}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="small text-muted">
                              {formatDate(fidelizacion.fechaRegistro)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="fw-medium text-dark">{fidelizacion.categoria}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(fidelizacion)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(fidelizacion.id)}
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
                      Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredFidelizacion.length)} de {filteredFidelizacion.length} fidelizacion
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

      {/* Modal para crear/editar fidelizacion */}
      {showModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingFidelizacion ? 'Editar afiliado' : 'Nuevo Usuario de afiliado'}
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
                      <label className="form-label">Nombre Completo *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cliente"
                        value={formData.cliente}
                        onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Folio *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="folio"
                        value={formData.folio}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Categoria</label>
                      <input
                        type="text"
                        className="form-control"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleInputChange}
                        required
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
                    {editingFidelizacion ? 'Actualizar' : 'Crear'} Fidelizacion
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

export default Fidelizacion;