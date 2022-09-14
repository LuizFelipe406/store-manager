const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModels = require('../../../src/models/salesModels');

describe('Testes de Unidade para Sales Models', function () {
  it('Testa a função insertSale', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([{ insertId: 5 }])
      .onSecondCall().resolves();
    const response = await salesModels.insertSale([{ productId: 1, quantity: 1 }]);
    expect(response).to.be.equal(5);
  });

  it('Testa a função getAllSales', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const response = await salesModels.getAllSales();

    expect(response).to.be.deep.equal([]);
  });

  it('Testa a função getSalesById', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const response = await salesModels.getSaleById(1);

    expect(response).to.be.deep.equal([]);
  });

  it('Testa a função deleteSale', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const response = await salesModels.deleteSale(1);

    expect(response.affectedRows).to.be.equal(1);
  });

  afterEach(sinon.restore);
});