const express = require('express');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(pedidoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});

module.exports = app;