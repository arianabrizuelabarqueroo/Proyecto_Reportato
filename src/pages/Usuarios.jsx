import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/custom.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      rol: 'Admin'
    },
    {
      id: 2,
      nombre: 'Laura Martínez',
      correo: 'laura.martinez@example.com',
      rol: 'Empleado'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    rol: 'Empleado',
    contrasena: ''
  });

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUsuario) {
      setUsuarios(prev =>
        prev.map(usuario =>
          usuario.id === editingUsuario.id ? { ...usuario, ...formData } : usuario
        )
      );
    } else {
      const newUsuario = {
        id: Date.now(),
        ...formData
      };
      setUsuarios(prev => [...prev, newUsuario]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      correo: '',
      rol: 'Empleado',
      contrasena: ''
    });
    setEditingUsuario(null);
    setShowModal(false);
  };

  const handleEdit = (usuario) => {
    setEditingUsuario(usuario);
    setFormData({
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      contrasena: ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      setUsuarios(prev => prev.filter(usuario => usuario.id !== id));
    }
  };

  return (
    <div className="app-layout bg-light">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold text-dark">
                  <i className="fas fa-user-shield text-primary-purple me-2"></i>
                  Gestión de Usuarios
                </h3>
                <p className="text-muted">Administrar usuarios y permisos del sistema</p>
              </div>
              <button className="btn btn-primary-purple" onClick={() => setShowModal(true)}>
                <i className="fas fa-plus me-1"></i>
                Nuevo Usuario
              </button>
            </div>
            <div className="row mb-4">
  <div className="col-xl-4 col-md-6 mb-3">
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body d-flex align-items-center">
        <div className="rounded-circle me-3" style={{ width: 20, height: 20, backgroundColor: '#6f42c1' }}></div>
        <div>
          <h5 className="mb-0 fw-bold">{usuarios.length}</h5>
          <small className="text-muted">Total Usuarios</small>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-4 col-md-6 mb-3">
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body d-flex align-items-center">
        <div className="rounded-circle me-3" style={{ width: 20, height: 20, backgroundColor: '#007bff' }}></div>
        <div>
          <h5 className="mb-0 fw-bold">
            {usuarios.filter(u => u.rol === 'Admin').length}
          </h5>
          <small className="text-muted">Administradores</small>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-4 col-md-6 mb-3">
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body d-flex align-items-center">
        <div className="rounded-circle me-3" style={{ width: 20, height: 20, backgroundColor: '#28a745' }}></div>
        <div>
          <h5 className="mb-0 fw-bold">
            {usuarios.filter(u => u.rol === 'Empleado').length}
          </h5>
          <small className="text-muted">Empleados</small>
        </div>
      </div>
    </div>
  </div>
</div>


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
                        placeholder="Buscar Usuarios..."
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
                        <th className="px-4 py-3">Nombre</th>
                        <th className="px-4 py-3">Correo</th>
                        <th className="px-4 py-3">Rol</th>
                        <th className="px-4 py-3">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsuarios.map(usuario => (
                        <tr key={usuario.id}>
                          <td className="px-4 py-3">{usuario.nombre}</td>
                          <td className="px-4 py-3">{usuario.correo}</td>
                          <td className="px-4 py-3">{usuario.rol}</td>
                          <td className="px-4 py-3">
                            <div className="d-flex gap-2">
                              <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(usuario)}>
                                <i className="fas fa-edit"></i>
                              </button>
                              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(usuario.id)}>
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

            {/* Modal para Crear usuario */}
            {showModal && (
              <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        {editingUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}
                      </h5>
                      <button type="button" className="btn-close" onClick={resetForm}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Nombre Completo *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Correo *</label>
                            <input
                              type="email"
                              className="form-control"
                              name="correo"
                              value={formData.correo}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
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
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Contraseña</label>
                            <input
                              type="password"
                              className="form-control"
                              name="contrasena"
                              value={formData.contrasena}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={resetForm}>
                          Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary-purple">
                          {editingUsuario ? 'Actualizar' : 'Crear'} Usuario
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