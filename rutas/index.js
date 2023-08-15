const productsRouter = require('./productos.ruta');
const express = require('express');
//const userRouter = require('./usuarios.ruta');

function RouterApi(app)
{
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/productos', productsRouter);
}

module.exports = RouterApi;
