import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
;

// Servir archivos estáticos desde la carpeta 'dist'
app.use(express.static('./', 'dist'));

// Ruta para manejar todas las solicitudes y servir 'index.html'
app.get('*', (req, res) => {
  res.sendFile('./', 'dist', 'index.html');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
