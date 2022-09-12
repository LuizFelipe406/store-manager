const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productModels = require('../../../src/models/productModels');

describe('Testes de Unidade de Product Models', function () {
  it('Testa a função getAllProducts', async function () {
    sinon.stub(connection, 'execute').resolves([['lista de produtos']]);

    const response = await productModels.getAllProducts();

    expect(response).to.be.deep.equal(['lista de produtos']);
  });

  it('Testa a função de getProductsById', async function () {
    sinon.stub(connection, 'execute').resolves(['produto buscado']);

    const response = await productModels.getProductById(1);

    expect(response).to.be.deep.equal('produto buscado');
  });

  it('Testa a função InsertProduct', async function() {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const response = await productModels.insertProduct('Produto Teste');

    expect(response.insertId).to.be.equal(5);
  });

  afterEach(sinon.restore);
});