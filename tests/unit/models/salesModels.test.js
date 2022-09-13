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
});