import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/custom.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    rol: 'Empleado'
  });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/usuarios');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.rol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsuarios = filteredUsuarios.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingUsuario ? 'PUT' : 'POST';
    const url = editingUsuario 
      ? `http://localhost:3001/usuarios/${editingUsuario.id}` 
      : 'http://localhost:3001/usuarios';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchUsuarios();
        resetForm();
      }
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  const handleEdit = (usuario) => {
    setEditingUsuario(usuario);
    setFormData({
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar este usuario?')) {
      await fetch(`http://localhost:3001/usuarios/${id}`, { method: 'DELETE' });
      fetchUsuarios();
    }
  };

  const resetForm = () => {
    setFormData({ nombre: '', correo: '', rol: 'Empleado' });
    setEditingUsuario(null);
    setShowModal(false);
  };

  return (
    <div className="app-layout bg-light">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <div className="container-fluid p-4">
            <div className="row mb-4">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="fw-bold text-dark mb-1">
                    <i className="fas fa-user-shield text-primary-purple me-2"></i>
                    Gestión de Usuarios
                  </h3>
                  <p className="text-muted mb-0">Administra los usuarios del sistema</p>
                </div>
                <button className="btn btn-primary-purple" onClick={() => setShowModal(true)}>
                  <i className="fas fa-plus me-1"></i> Nuevo Usuario
                </button>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body d-flex align-items-center">
                    <i className="fas fa-users fa-2x text-primary-purple me-3"></i>
                    <div>
                      <h5 className="fw-bold mb-0">{usuarios.length}</h5>
                      <small className="text-muted">Total Usuarios</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body d-flex align-items-center">
                    <i className="fas fa-user-tie fa-2x text-primary-green me-3"></i>
                    <div>
                      <h5 className="fw-bold mb-0">
                        {usuarios.filter(u => u.rol.toLowerCase() === 'admin').length}
                      </h5>
                      <small className="text-muted">Administradores</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body d-flex align-items-center">
                    <i className="fas fa-user fa-2x text-primary-orange me-3"></i>
                    <div>
                      <h5 className="fw-bold mb-0">
                        {usuarios.filter(u => u.rol.toLowerCase() === 'empleado').length}
                      </h5>
                      <small className="text-muted">Empleados</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla */}
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsuarios.map((usuario) => (
                        <tr key={usuario.id}>
                          <td>{usuario.nombre}</td>
                          <td>{usuario.correo}</td>
                          <td>{usuario.rol}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(usuario)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(usuario.id)}
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
              </div>
            </div>

            {/* Modal */}
            {showModal && (
              <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        {editingUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}
                      </h5>
                      <button type="button" className="btn-close" onClick={resetForm}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="modal-body">
                        <div className="mb-3">
                          <label className="form-label">Nombre</label>
                          <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Correo</label>
                          <input
                            type="email"
                            className="form-control"
                            name="correo"
                            value={formData.correo}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Rol</label>
                          <select
                            className="form-select"
                            name="rol"
                            value={formData.rol}
                            onChange={handleInputChange}
                          >
                            <option value="Admin">Admin</option>
                            <option value="Empleado">Empleado</option>
                          </select>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={resetForm}>
                          Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary-purple">
                          {editingUsuario ? 'Actualizar' : 'Crear'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
