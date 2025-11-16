// server.js

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Render te da el puerto en process.env.PORT
const port = process.env.PORT || 3000;

// Habilitar CORS para que freeCodeCamp pueda probar tu API
app.use(cors());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Configuración de multer (archivo en memoria, no en disco)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta principal: devuelve el index.html explícitamente
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de la API para analizar el archivo
// El campo del input DEBE llamarse "upfile"
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  const file = req.file;

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

// 404 por si alguien entra a otra ruta
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Arrancar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
