const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService
{
  constructor()
  {
    this.productos =[];
    this.generate();
  }
  generate()
  {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
    this.productos.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
      isBlock: faker.datatype.boolean(),

    });

  }
  }
   async create(data)
  {
    const newProduct =
    {
      id: faker.datatype.uuid(),
      ...data
    }
    this.productos.push(newProduct);
    return newProduct;
  }
  async find()
  {
    return new Promise((resolve, reject) =>
    {
      setTimeout(() =>
      {
        resolve(this.productos);
      }, 5000 );
    });
  }
  async finOne(id)
  {
    const producto = this.productos.find(item => item.id === id);
    if(!producto)
    {
      throw boom.notFound('Product not found');
    }
    if(producto.isBlock)
    {
      throw boom.conflict('Product not found');
    }
    return producto;
  }
  async update(id, changes)
  {
    const index = this.productos.findIndex(item => item.id === id);
    if(index === -1)
    {
      throw boom.notFound('Product not found');

    }
    const producto = this.productos[index];
    this.productos[index] =
    {
      ...producto,
      ...changes
    }
    return this.productos[index];
  }
  async delete(id)
  {
    const index = this.productos.findIndex(item => item.id === id);
    if(index === -1)
    {
      throw new Error('Product not found');
    }
    this.productos.splice(index, 1);
    return { id };
  }



}

module.exports = ProductsService;
