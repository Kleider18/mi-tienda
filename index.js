const express = require('express');
const cors = require('cors');
const RouterApi = require('./rutas');

const { logError, errorHandler, boomErrorHandler } = require('./middleware/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080'];
const options =
{
  origin: (origin, callback) =>
  {
    if(whitelist.includes(origin) || !origin)
    {
      callback(null, true);
    }
    else
    {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors());

app.get('/',(req, res) =>
{
  res.send('Hola mi server express')
});

app.get('/nueva-ruta',(req, res) =>
{
  res.send('Hola soy una nueva ruta')
});

RouterApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);


app.get('/categorias/:categoriaId/productos/:productoId', (req, res) =>
{
  const {categoriaId, productoId} = req.params;
  res.json({
     categoriaId,
     productoId

  });
});

app.get('/usuarios', (req, res) =>
{
  const { limit, offset } = req.query;
  if (limit && offset)
  {
    res.json({
      limit,
      offset

    });
  }
  else
  {
    res.send('No hay parametros');
  }

});

app.listen(port, () =>
{
  console.log('Mi port'+port);
})

RouterApi(app);
