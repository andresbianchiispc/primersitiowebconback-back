---Como crear un servidor--
Paso 1:
Crear la carpeta

Paso 2: 
npm init -y

👉 Crea un archivo package.json
(es la “configuración” del servidor)

Paso 3: 
Instalar lo necesario
npm install express mysql2 cors

📌 ¿Para qué sirve cada uno?

Paquete	Para qué sirve
express	Crear el servidor
mysql2	Conectarse a MySQL
cors	Permitir conexión desde Angular

Paso 4: 
Creá un archivo llamado
backend/index.js

Paso 5: 
Crea la base de datos en MySQL:
CREATE DATABASE contacto_web;
USE contacto_web;

Crea la tabla contactos:
CREATE TABLE contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  mensaje TEXT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Paso 6:
Configura las credenciales en el archivo app.js (o donde tengas el código):

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia si tu usuario es diferente
  password: 'admin', // Cambia por tu contraseña
  database: 'contacto_web'
});



🚀 Ejecución del Servidor
Inicia el servidor:
node index.js

Para probar:
Ejemplo de cuerpo de la solicitud (JSON):

{
  "nombre": "Andrés Bianchi",
  "email": "andres@example.com",
  "mensaje": "Hola, esto es un mensaje de prueba."
}

Respuesta esperada:

Si todo funciona: "Guardado".
Si hay un error: "Error" con código 500.


📂 Estructura del Proyecto
Copiar

tu-repositorio/
├── index.js        # Código principal del servidor
├── package.json    # Dependencias y scripts
└── README.md       # Este archivo


📝 Endpoints Disponibles    
      Método
      Ruta
      Descripción
        
      POST
      /contacto
      Guarda un mensaje de contacto.
    
  
🧪 Pruebas con Postman

Abre Postman y crea una nueva solicitud.
Configura la solicitud:

Método: POST
URL: http://localhost:3000/contacto
Headers: Content-Type: application/json
Body (raw, JSON):
json
Copiar

{
  "nombre": "Andrés Bianchi",
  "email": "andres@example.com",
  "mensaje": "Hola, esto es un mensaje de prueba."
}

Envía la solicitud y verifica la respuesta.

