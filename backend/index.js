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
  user: 'username',
  password: 'password',
  database: 'DB_name',
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
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

// Rutas para usuarios
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios ORDER BY nombre', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post('/usuarios', (req, res) => {
  const { nombre, correo, rol } = req.body;

  db.query(
    'INSERT INTO usuarios (nombre, correo, rol) VALUES (?, ?, ?)',
    [nombre, correo, rol],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, message: 'Usuario creado exitosamente' });
    }
  );
});

app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo, rol } = req.body;

  db.query(
    'UPDATE usuarios SET nombre = ?, correo = ?, rol = ? WHERE id = ?',
    [nombre, correo, rol, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Usuario actualizado exitosamente' });
    }
  );
});

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Usuario eliminado exitosamente' });
  });
});
