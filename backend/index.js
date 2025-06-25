const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root', 
  password: 'admin', 
  database: 'reportato'
};

let db;
async function connectDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Conectado a la base de datos MySQL');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1);
  }
}


// Rutas para usuarios - CORREGIDAS para usar async/await
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM usuarios ORDER BY nombre');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, correo, rol } = req.body;

    if (!nombre || !correo) {
      return res.status(400).json({ message: 'Nombre y correo son requeridos' });
    }

    const [result] = await db.execute(
      'INSERT INTO usuarios (nombre, correo, rol) VALUES (?, ?, ?)',
      [nombre, correo, rol]
    );

    res.status(201).json({ 
      id: result.insertId, 
      message: 'Usuario creado exitosamente' 
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, rol } = req.body;

    const [result] = await db.execute(
      'UPDATE usuarios SET nombre = ?, correo = ?, rol = ? WHERE id = ?',
      [nombre, correo, rol, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Rutas para productos
app.get('/productos', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM PRODUCTOS ORDER BY fecha_registro DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/productos', async (req, res) => {
  try {
    const { nombre, categoria, unidad_medida, descripcion, estado } = req.body;
    
    if (!nombre || !categoria) {
      return res.status(400).json({ message: 'Nombre y categoría son requeridos' });
    }

    const [result] = await db.execute(
      'INSERT INTO PRODUCTOS (nombre, categoria, unidad_medida, descripcion, estado) VALUES (?, ?, ?, ?, ?)',
      [nombre, categoria, unidad_medida, descripcion, estado]
    );

    res.status(201).json({
      message: 'Producto creado exitosamente',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categoria, unidad_medida, descripcion, estado } = req.body;

    const [result] = await db.execute(
      'UPDATE PRODUCTOS SET nombre = ?, categoria = ?, unidad_medida = ?, descripcion = ?, estado = ? WHERE id = ?',
      [nombre, categoria, unidad_medida, descripcion, estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.delete('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.execute('DELETE FROM PRODUCTOS WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para obtener productos activos
app.get('/productos/activos', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM PRODUCTOS WHERE estado = "Activo" ORDER BY fecha_registro DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener productos activos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Rutas para inventario - FIXED
app.get('/inventario', async (req, res) => {
  try {
    const query = `
      SELECT inv.*, p.nombre AS nombre_producto, p.categoria, p.unidad_medida
      FROM INVENTARIO inv
      JOIN PRODUCTOS p ON inv.producto_id = p.id
      ORDER BY inv.fecha_registro DESC
    `;
    const [rows] = await db.execute(query);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/inventario', async (req, res) => {
  try {
    const { producto_id, stock_actual, stock_minimo, precio_unitario, fecha_ingreso, fecha_vencimiento, estado } = req.body;
    
    const [result] = await db.execute(
      `INSERT INTO INVENTARIO 
        (producto_id, stock_actual, stock_minimo, precio_unitario, fecha_ingreso, fecha_vencimiento, estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [producto_id, stock_actual, stock_minimo, precio_unitario, fecha_ingreso, fecha_vencimiento, estado]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Registro de inventario creado exitosamente' 
    });
  } catch (error) {
    console.error('Error al crear registro de inventario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.put('/inventario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { producto_id, stock_actual, stock_minimo, precio_unitario, fecha_ingreso, fecha_vencimiento, estado } = req.body;
    
    const [result] = await db.execute(
      `UPDATE INVENTARIO SET 
        producto_id = ?, stock_actual = ?, stock_minimo = ?, precio_unitario = ?, 
        fecha_ingreso = ?, fecha_vencimiento = ?, estado = ?
       WHERE id = ?`,
      [producto_id, stock_actual, stock_minimo, precio_unitario, fecha_ingreso, fecha_vencimiento, estado, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Registro de inventario no encontrado' });
    }
    
    res.json({ message: 'Registro de inventario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar registro de inventario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.delete('/inventario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.execute('DELETE FROM INVENTARIO WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Registro de inventario no encontrado' });
    }
    
    res.json({ message: 'Registro de inventario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar registro de inventario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Rutas para proveedores
// Rutas para proveedores - Agregar en tu archivo de rutas

// GET - Obtener todos los proveedores
app.get('/proveedores', async (req, res) => {
  try {
    const query = 'SELECT * FROM PROVEEDORES ORDER BY fecha_registro DESC';
    const [rows] = await db.execute(query);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET - Obtener un proveedor por ID
app.get('/proveedores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM PROVEEDORES WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener proveedor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST - Crear nuevo proveedor
app.post('/proveedores', async (req, res) => {
  try {
    const { nombre, empresa, telefono, email, direccion, ciudad, tipo_proveedor, estado } = req.body;
    
    // Validación básica
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const query = `
      INSERT INTO PROVEEDORES 
      (nombre, empresa, telefono, email, direccion, ciudad, tipo_proveedor, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.execute(query, [
      nombre,
      empresa || null,
      telefono || null,
      email || null,
      direccion || null,
      ciudad || null,
      tipo_proveedor || 'Mayorista',
      estado || 'Activo'
    ]);
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Proveedor creado exitosamente' 
    });
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PUT - Actualizar proveedor
app.put('/proveedores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, empresa, telefono, email, direccion, ciudad, tipo_proveedor, estado } = req.body;
    
    // Validación básica
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const query = `
      UPDATE PROVEEDORES 
      SET nombre = ?, empresa = ?, telefono = ?, email = ?, 
          direccion = ?, ciudad = ?, tipo_proveedor = ?, estado = ?
      WHERE id = ?
    `;
    
    const [result] = await db.execute(query, [
      nombre,
      empresa || null,
      telefono || null,
      email || null,
      direccion || null,
      ciudad || null,
      tipo_proveedor || 'Mayorista',
      estado || 'Activo',
      id
    ]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    
    res.json({ message: 'Proveedor actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// DELETE - Eliminar proveedor
app.delete('/proveedores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = 'DELETE FROM PROVEEDORES WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    
    res.json({ message: 'Proveedor eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Rutas para sucursales/puntos de venta
app.get('/sucursales', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM sucursales ORDER BY nombre');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener solo sucursales activas
app.get('/sucursales/activas', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM sucursales WHERE estado = "activa" ORDER BY nombre');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener sucursales activas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/sucursales', async (req, res) => {
  try {
    const { nombre, tipo, ubicacion, estado } = req.body;

    if (!nombre || !tipo || !ubicacion) {
      return res.status(400).json({ message: 'Nombre, tipo y ubicación son requeridos' });
    }

    const [result] = await db.execute(
      'INSERT INTO sucursales (nombre, tipo, ubicacion, estado) VALUES (?, ?, ?, ?)',
      [nombre, tipo, ubicacion, estado || 'activa']
    );

    res.status(201).json({ 
      id: result.insertId, 
      message: 'Sucursal creada exitosamente' 
    });
  } catch (error) {
    console.error('Error al crear sucursal:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.put('/sucursales/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, ubicacion, estado } = req.body;

    const [result] = await db.execute(
      'UPDATE sucursales SET nombre = ?, tipo = ?, ubicacion = ?, estado = ? WHERE id = ?',
      [nombre, tipo, ubicacion, estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }

    res.json({ message: 'Sucursal actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar sucursal:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.delete('/sucursales/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute('DELETE FROM sucursales WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }

    res.json({ message: 'Sucursal eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar sucursal:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Endpoint para cambiar estado de sucursal (activa/inactiva)
app.patch('/sucursales/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['activa', 'inactiva'].includes(estado)) {
      return res.status(400).json({ message: 'Estado debe ser "activa" o "inactiva"' });
    }

    const [result] = await db.execute(
      'UPDATE sucursales SET estado = ? WHERE id = ?',
      [estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }

    res.json({ message: `Sucursal marcada como ${estado} exitosamente` });
  } catch (error) {
    console.error('Error al cambiar estado de sucursal:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Rutas para ventas diarias
app.get('/ventas-diarias', async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin, sucursal_id } = req.query;
    
    let query = 'SELECT * FROM vista_ventas_diarias WHERE 1=1';
    let params = [];
    
    if (fecha_inicio) {
      query += ' AND fecha_venta >= ?';
      params.push(fecha_inicio);
    }
    
    if (fecha_fin) {
      query += ' AND fecha_venta <= ?';
      params.push(fecha_fin);
    }
    
    if (sucursal_id) {
      query += ' AND sucursal_id = ?';
      params.push(sucursal_id);
    }
    
    query += ' ORDER BY fecha_venta DESC, sucursal_nombre';
    
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener ventas diarias:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener ventas de hoy
app.get('/ventas-diarias/hoy', async (req, res) => {
  try {
    const hoy = new Date().toISOString().split('T')[0];
    const [rows] = await db.execute(
      'SELECT * FROM vista_ventas_diarias WHERE fecha_venta = ? ORDER BY sucursal_nombre', 
      [hoy]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener ventas de hoy:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener resumen de ventas por período
app.get('/ventas-diarias/resumen', async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query;
    
    let query = `
      SELECT 
        sucursal_id,
        sucursal_nombre,
        sucursal_tipo,
        COUNT(*) as dias_registrados,
        SUM(venta_efectivo) as total_efectivo,
        SUM(venta_tarjeta) as total_tarjeta,
        SUM(venta_sinpe) as total_sinpe,
        SUM(venta_total) as total_ventas,
        AVG(venta_total) as promedio_diario
      FROM vista_ventas_diarias 
      WHERE 1=1
    `;
    
    let params = [];
    
    if (fecha_inicio) {
      query += ' AND fecha_venta >= ?';
      params.push(fecha_inicio);
    }
    
    if (fecha_fin) {
      query += ' AND fecha_venta <= ?';
      params.push(fecha_fin);
    }
    
    query += ' GROUP BY sucursal_id, sucursal_nombre, sucursal_tipo ORDER BY total_ventas DESC';
    
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener resumen de ventas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Crear nueva venta diaria
app.post('/ventas-diarias', async (req, res) => {
  try {
    const { sucursal_id, fecha_venta, venta_efectivo, venta_tarjeta, venta_sinpe, observaciones, estado } = req.body;

    if (!sucursal_id || !fecha_venta) {
      return res.status(400).json({ message: 'Sucursal y fecha de venta son requeridos' });
    }

    // Verificar que la sucursal existe y está activa
    const [sucursal] = await db.execute('SELECT id FROM sucursales WHERE id = ? AND estado = "activa"', [sucursal_id]);
    if (sucursal.length === 0) {
      return res.status(400).json({ message: 'La sucursal no existe o está inactiva' });
    }

    const [result] = await db.execute(
      `INSERT INTO ventas_diarias 
       (sucursal_id, fecha_venta, venta_efectivo, venta_tarjeta, venta_sinpe, observaciones, estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        sucursal_id, 
        fecha_venta, 
        venta_efectivo || 0, 
        venta_tarjeta || 0, 
        venta_sinpe || 0, 
        observaciones || '', 
        estado || 'pendiente'
      ]
    );

    res.status(201).json({ 
      id: result.insertId, 
      message: 'Venta diaria registrada exitosamente' 
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Ya existe un registro de ventas para esta sucursal en esta fecha' });
    }
    console.error('Error al crear venta diaria:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Actualizar venta diaria
app.put('/ventas-diarias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { sucursal_id, fecha_venta, venta_efectivo, venta_tarjeta, venta_sinpe, observaciones, estado } = req.body;

    // Verificar que la sucursal existe y está activa
    const [sucursal] = await db.execute('SELECT id FROM sucursales WHERE id = ? AND estado = "activa"', [sucursal_id]);
    if (sucursal.length === 0) {
      return res.status(400).json({ message: 'La sucursal no existe o está inactiva' });
    }

    const [result] = await db.execute(
      `UPDATE ventas_diarias 
       SET sucursal_id = ?, fecha_venta = ?, venta_efectivo = ?, venta_tarjeta = ?, 
           venta_sinpe = ?, observaciones = ?, estado = ?
       WHERE id = ?`,
      [sucursal_id, fecha_venta, venta_efectivo || 0, venta_tarjeta || 0, venta_sinpe || 0, observaciones || '', estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Venta diaria no encontrada' });
    }

    res.json({ message: 'Venta diaria actualizada exitosamente' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Ya existe un registro de ventas para esta sucursal en esta fecha' });
    }
    console.error('Error al actualizar venta diaria:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Eliminar venta diaria
app.delete('/ventas-diarias/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute('DELETE FROM ventas_diarias WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Venta diaria no encontrada' });
    }

    res.json({ message: 'Venta diaria eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar venta diaria:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Cambiar estado de venta diaria
app.patch('/ventas-diarias/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['pendiente', 'confirmada', 'cerrada'].includes(estado)) {
      return res.status(400).json({ message: 'Estado debe ser "pendiente", "confirmada" o "cerrada"' });
    }

    const [result] = await db.execute(
      'UPDATE ventas_diarias SET estado = ? WHERE id = ?',
      [estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Venta diaria no encontrada' });
    }

    res.json({ message: `Venta diaria marcada como ${estado} exitosamente` });
  } catch (error) {
    console.error('Error al cambiar estado de venta diaria:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener estadísticas generales
app.get('/ventas-diarias/estadisticas', async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query;
    
    let whereClause = '1=1';
    let params = [];
    
    if (fecha_inicio) {
      whereClause += ' AND fecha_venta >= ?';
      params.push(fecha_inicio);
    }
    
    if (fecha_fin) {
      whereClause += ' AND fecha_venta <= ?';
      params.push(fecha_fin);
    }

    const [stats] = await db.execute(`
      SELECT 
        COUNT(*) as total_registros,
        COUNT(DISTINCT sucursal_id) as sucursales_activas,
        SUM(venta_total) as total_ventas,
        AVG(venta_total) as promedio_venta,
        SUM(venta_efectivo) as total_efectivo,
        SUM(venta_tarjeta) as total_tarjeta,
        SUM(venta_sinpe) as total_sinpe,
        MAX(venta_total) as venta_maxima,
        MIN(venta_total) as venta_minima
      FROM vista_ventas_diarias 
      WHERE ${whereClause}
    `, params);

    res.json(stats[0]);
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

async function startServer() {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);