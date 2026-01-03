require('dotenv').config(); // Solo para desarrollo local (no afecta en Railway)

const express = require('express');
const mysql = require('mysql2/promise'); // Usamos la versión con promesas
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));
app.use(express.json());

// Configuración del pool de conexiones para Railway
let pool;
try {
  // Usamos MYSQL_URL si está disponible (formato: mysql://user:password@host:port/database)
  // Railway proporciona esta variable automáticamente
  pool = mysql.createPool(process.env.MYSQL_URL);

  console.log('✅ Pool de MySQL creado correctamente');

  // Manejo de eventos del pool
  pool.on('connection', () => console.log('🔗 Nueva conexión establecida a MySQL'));
  pool.on('error', (err) => console.error('❌ Error en el pool de MySQL:', err));
} catch (err) {
  console.error('❌ Error al crear el pool de MySQL:', err);
  process.exit(1); // Salir si no se puede crear el pool
}

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});

// Endpoint para guardar contactos
app.post('/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Validación de datos
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({
      error: 'Faltan datos obligatorios: nombre, email o mensaje'
    });
  }

  try {
    // Insertar datos en la base de datos
    const [result] = await pool.query(`
      INSERT INTO contactos (nombre, email, mensaje)
      VALUES (?, ?, ?)
    `, [nombre, email, mensaje]);

    console.log('📝 Contacto guardado:', { nombre, email });
    res.status(200).json({
      mensaje: 'Contacto guardado correctamente',
      datos: { nombre, email }
    });
  } catch (err) {
    console.error('❌ Error al guardar contacto:', err);
    res.status(500).json({
      error: 'Error al guardar en la base de datos',
      detalles: err.message // Solo para desarrollo, no en producción
    });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
