// server.js

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS para que freeCodeCamp pueda hacer las pruebas
app.use(cors());

// Servir archivos estáticos de la carpeta "public"
app.use(express.static('public'));

// Configuración de multer (subidas en memoria)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta principal: devuelve el formulario
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de la API para analizar el archivo
// El input de archivo debe llamarse "upfile"
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  const file = req.file;

  // Lo que espera freeCodeCamp
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

// Arrancar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
