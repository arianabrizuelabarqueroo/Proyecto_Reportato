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
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_de_tu_base_datos',
});

// Prueba la conexión
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Ruta de ejemplo: obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});



// Rutas para productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM PRODUCTOS ORDER BY nombre', (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

app.post('/productos', (req, res) => {
  const { nombre, categoria, unidad_medida, descripcion, estado } = req.body;
  
  db.query(
    'INSERT INTO PRODUCTOS (nombre, categoria, unidad_medida, descripcion, estado) VALUES (?, ?, ?, ?, ?)',
    [nombre, categoria, unidad_medida, descripcion, estado],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
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
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ message: 'Producto actualizado exitosamente' });
    }
  );
});

app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  
  db.query('DELETE FROM PRODUCTOS WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  });
});

app.listen(PORT, () => {
  console.log("Servidor backend corriendo en http://localhost:${PORT}");
});