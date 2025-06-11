// backend/index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Configura tu conexión con MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'reportato',
});

// Prueba la conexión
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Ruta: Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Rutas para productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM PRODUCTOS ORDER BY nombre', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Ruta específica para obtener productos activos (para el dropdown de inventario)
app.get('/productos/activos', (req, res) => {
  db.query('SELECT id, nombre, categoria, unidad_medida FROM PRODUCTOS WHERE estado = "Activo" ORDER BY nombre', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post('/productos', (req, res) => {
  const { nombre, categoria, unidad_medida, descripcion, estado } = req.body;
  db.query(
    'INSERT INTO PRODUCTOS (nombre, categoria, unidad_medida, descripcion, estado) VALUES (?, ?, ?, ?, ?)',
    [nombre, categoria, unidad_medida, descripcion, estado],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, message: 'Producto creado exitosamente' });
    }
  );
});

app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, unidad_medida, descripcion, estado } = req.body;
  db.query(
    'UPDATE PRODUCTOS SET nombre = ?, categoria = ?, unidad_medida = ?, descripcion = ?, estado = ? WHERE id = ?',
    [nombre, categoria, unidad_medida, descripcion, estado, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Producto actualizado exitosamente' });
    }
  );
});

app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM PRODUCTOS WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Producto eliminado exitosamente' });
  });
});

// Rutas para inventario
app.get('/inventario', (req, res) => {
  const query = `
    SELECT inv.*, p.nombre AS nombre_producto, p.categoria, p.unidad_medida
    FROM INVENTARIO inv
    JOIN PRODUCTOS p ON inv.producto_id = p.id
    ORDER BY inv.fecha_registro DESC
  `;
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post('/inventario', (req, res) => {
  const { producto_id, stock_actual, stock_minimo, precio_unitario, fecha_ingreso, fecha_vencimiento, estado } = req.body;
  db.query(
    `INSERT INTO INVENTARIO 
      (producto_id, stock_actual, stock_minimo, precio_unitario, fecha_ingreso, fecha_vencimiento, estado) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [producto_id, stock_actual, stock_minimo, precio_unitario, fecha_ingreso, fecha_vencimiento, estado],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, message: 'Registro de inventario creado exitosamente' });
    }
  );
});

app.put('/inventario/:id', (req, res) => {
  const { id } = req.params;
  const { producto_id, stock_actual, stock_minimo, precio_unitario, fecha_ingreso, fecha_vencimiento, estado } = req.body;
  db.query(
    `UPDATE INVENTARIO SET 
      producto_id = ?, stock_actual = ?, stock_minimo = ?, precio_unitario = ?, 
      fecha_ingreso = ?, fecha_vencimiento = ?, estado = ?
     WHERE id = ?`,
    [producto_id, stock_actual, stock_minimo, precio_unitario, fecha_ingreso, fecha_vencimiento, estado, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Registro de inventario actualizado exitosamente' });
    }
  );
});

app.delete('/inventario/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM INVENTARIO WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Registro de inventario eliminado exitosamente' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});