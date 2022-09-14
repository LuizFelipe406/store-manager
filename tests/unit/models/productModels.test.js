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

  it('Testa a função insertProduct', async function() {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const response = await productModels.insertProduct('Produto Teste');

    expect(response.insertId).to.be.equal(5);
  });

  it('Testa a função updateProducts', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const response = await productModels.updateProduct(1, 'Produto Atualizado');

    expect(response.affectedRows).to.be.equal(1);
  });

  it('Testa a função deleteProducts', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const response = await productModels.deleteProduct(1);

    expect(response.affectedRows).to.be.equal(1);
  });

  afterEach(sinon.restore);
});