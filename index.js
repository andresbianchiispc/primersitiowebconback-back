const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'contacto_web'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error MySQL:', err);
  } else {
    console.log('✅ MySQL conectado');
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Ruta para guardar contacto
app.post('/contacto', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Validación backend (obligatoria)
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({
      error: 'Datos incompletos'
    });
  }

  const sql = `
    INSERT INTO contactos (nombre, email, mensaje)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nombre, email, mensaje], (err) => {
    if (err) {
      console.error('❌ Error INSERT:', err);
      return res.status(500).json({
        error: 'Error al guardar en la base de datos'
      });
    }

    res.status(200).json({
      mensaje: 'Contacto guardado correctamente'
    });
  });
});

// Levantar servidor
app.listen(3000, () => {
  console.log('🚀 Servidor en http://localhost:3000');
});
