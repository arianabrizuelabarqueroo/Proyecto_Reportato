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


app.get('/proveedores', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM PROVEEDORES ORDER BY fecha_registro DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/proveedores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM PROVEEDORES WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener proveedor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/proveedores', async (req, res) => {
  try {
    const {
      nombre,
      empresa,
      telefono,
      email,
      direccion,
      ciudad,
      tipo_proveedor,
      estado
    } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre del proveedor es requerido' });
    }

    const [result] = await db.execute(
      `INSERT INTO PROVEEDORES 
       (nombre, empresa, telefono, email, direccion, ciudad, tipo_proveedor, estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, empresa, telefono, email, direccion, ciudad, tipo_proveedor, estado]
    );

    res.status(201).json({
      message: 'Proveedor creado exitosamente',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.put('/proveedores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      empresa,
      telefono,
      email,
      direccion,
      ciudad,
      tipo_proveedor,
      estado
    } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre del proveedor es requerido' });
    }

    const [result] = await db.execute(
      `UPDATE PROVEEDORES 
       SET nombre = ?, empresa = ?, telefono = ?, email = ?, 
           direccion = ?, ciudad = ?, tipo_proveedor = ?, estado = ?
       WHERE id = ?`,
      [nombre, empresa, telefono, email, direccion, ciudad, tipo_proveedor, estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    res.json({ message: 'Proveedor actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.delete('/proveedores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [productRelations] = await db.execute(
      'SELECT COUNT(*) as count FROM PRODUCTO_PROVEEDOR WHERE proveedor_id = ?',
      [id]
    );
    
    if (productRelations[0].count > 0) {
      return res.status(409).json({ 
        message: 'No se puede eliminar el proveedor porque tiene productos asignados' 
      });
    }

    const [result] = await db.execute('DELETE FROM PROVEEDORES WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    res.json({ message: 'Proveedor eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/producto-proveedor', async (req, res) => {
  try {
    const {
      producto_id,
      proveedor_id,
      precio_compra,
      tiempo_entrega_dias
    } = req.body;

    if (!producto_id || !proveedor_id) {
      return res.status(400).json({ 
        message: 'El ID del producto y el ID del proveedor son requeridos' 
      });
    }

    const [producto] = await db.execute(
      'SELECT id, estado FROM PRODUCTOS WHERE id = ?',
      [producto_id]
    );
    
    if (producto.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    if (producto[0].estado !== 'Activo') {
      return res.status(400).json({ message: 'El producto debe estar activo' });
    }

    const [proveedor] = await db.execute(
      'SELECT id, estado FROM PROVEEDORES WHERE id = ?',
      [proveedor_id]
    );
    
    if (proveedor.length === 0) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    
    if (proveedor[0].estado !== 'Activo') {
      return res.status(400).json({ message: 'El proveedor debe estar activo' });
    }

    const [result] = await db.execute(
      `INSERT INTO PRODUCTO_PROVEEDOR 
       (producto_id, proveedor_id, precio_compra, tiempo_entrega_dias) 
       VALUES (?, ?, ?, ?)`,
      [producto_id, proveedor_id, precio_compra || 0, tiempo_entrega_dias || 1]
    );

    res.status(201).json({
      message: 'Producto asignado al proveedor exitosamente',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error al asignar producto a proveedor:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ 
        message: 'Este producto ya está asignado a este proveedor' 
      });
    }
    
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/proveedores/:id/productos', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [rows] = await db.execute(`
      SELECT 
        p.id,
        p.nombre,
        p.categoria,
        p.unidad_medida,
        pp.precio_compra,
        pp.tiempo_entrega_dias,
        pp.fecha_asignacion,
        pp.estado as estado_asignacion
      FROM PRODUCTOS p
      JOIN PRODUCTO_PROVEEDOR pp ON p.id = pp.producto_id
      WHERE pp.proveedor_id = ?
      ORDER BY pp.fecha_asignacion DESC
    `, [id]);
    
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener productos del proveedor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/productos/:id/proveedores', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [rows] = await db.execute(`
      SELECT 
        pr.id,
        pr.nombre,
        pr.empresa,
        pr.telefono,
        pr.email,
        pr.ciudad,
        pr.tipo_proveedor,
        pp.precio_compra,
        pp.tiempo_entrega_dias,
        pp.fecha_asignacion,
        pp.estado as estado_asignacion
      FROM PROVEEDORES pr
      JOIN PRODUCTO_PROVEEDOR pp ON pr.id = pp.proveedor_id
      WHERE pp.producto_id = ?
      ORDER BY pp.precio_compra ASC
    `, [id]);
    
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener proveedores del producto:', error);
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