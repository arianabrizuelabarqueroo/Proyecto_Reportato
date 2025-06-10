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