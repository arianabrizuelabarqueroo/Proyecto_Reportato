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

// Rutas para fidelizacion - NUEVO
app.get('/fidelizacion', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM fidelizacion ORDER BY cliente');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener fidelizacion:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//CREAR NUEVO USUARIO FIDELIZACION
app.post('/fidelizacion', async (req, res) => {
  try {
    const { folio, usuario, cliente, categoria } = req.body;

    if (!folio || !usuario) {
      return res.status(400).json({ message: 'Usuario y folio son requeridos' });
    }

    const [result] = await db.execute(
      'INSERT INTO fidelizacion (folio, usuario_id, cliente, categoria) VALUES (?, ?, ?, ?)',
      [folio, usuario, cliente, categoria]
    );

    res.status(201).json({ 
      id: result.insertId, 
      message: 'Usuario creado exitosamente' 
    });
  } catch (error) {
    console.error('Error al crear usuario fidelizacion:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//ACTUALIZACION/ EDICION DE USUARIO
app.put('/fidelizacion/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { folio, usuario, cliente, categoria } = req.body;

    const [result] = await db.execute(
      'UPDATE fidelizacion SET folio = ?, usuario_id = ?, cliente = ?, categoria = ? WHERE id = ?',
      [folio, usuario, cliente, categoria, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario fidelizacion no encontrado' });
    }

    res.json({ message: 'Usuario fidelizacion actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar usuario fidelizacion:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//ELIMINACION DE USUARIO FIDELIZACION 
app.delete('/fidelizacion/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute('DELETE FROM fidelizacion WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario fidelizacion no encontrado' });
    }

    res.json({ message: 'Usuario fidelizacion eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario fidelizacion:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

async function startServer() {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Rutas para Compras - NUEVO
app.get('/compras', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM compras ORDER BY usuario_id');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener compras:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//CREAR NUEVA COMPRA
app.post('/compras', async (req, res) => {
  try {
    const { usuario, proveedor, fecha, producto, precio, cantidad, total } = req.body;

    if (!usuario || !proveedor) {
      return res.status(400).json({ message: 'Usuario y proveedor son requeridos' });
    }

    const [result] = await db.execute(
      'INSERT INTO COMPRAS (usuario_id, proveedor_id, fecha_realizada, producto_id, precio_unitario, cantidad_producto, total) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [usuario, proveedor, fecha, producto, precio, cantidad, total]
    );

    res.status(201).json({ 
      id: result.insertId, 
      message: 'Compra creada exitosamente' 
    });
  } catch (error) {
    console.error('Error al crear la compra:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//ACTUALIZACION/ EDICION DE COMPRAS
app.put('/compras/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, proveedor, fecha, producto, precio, cantidad, total } = req.body;

    const [result] = await db.execute(
      'UPDATE compras SET usuario_id = ?, proveedor_id = ?, fecha_realizada = ?, producto_id = ?, precio_unitario = ?, cantidad_producto = ?, total = ? WHERE id = ?',
      [usuario, proveedor, fecha, producto, precio, cantidad, total, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }

    res.json({ message: 'Compra actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la compra:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//ELIMINACION DE COMPRA
app.delete('/compras/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute('DELETE FROM compras WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }

    res.json({ message: 'Compra eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la compra:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

startServer().catch(console.error);