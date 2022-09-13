const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const salesServices = require('../../../src/services/salesServices');
const salesModels = require('../../../src/models/salesModels');
const productModels = require('../../../src/models/productModels');

describe('Testes de Unidade de Sales Services', function () {
  it('Testa a função Insert Sale com sucesso', async function () {
    sinon.stub(salesModels, 'insertSale').resolves(5);
    sinon.stub(productModels, 'getProductById').resolves([true]);

    const response = await salesServices.insertSale([{ productId: 1, quantity: 1 }]);

    expect(response).to.be.equal(5);
  });
  it('Testa a função Insert Sale sem productId', async function () {
    const error = new Error('PRODUCT_ID_IS_REQUIRED');
    let errorResponse;
    sinon.stub(salesModels, 'insertSale').resolves(5);
    sinon.stub(productModels, 'getProductById').resolves([true]);

    try {
      await salesServices.insertSale([{ quantity: 1 }]);
    } catch (err) {
      errorResponse = err;
    }
    expect(errorResponse.message).to.be.equal(error.message);
  });
  it('Testa a função Insert Sale com quantity invalida', async function () {
    const error = new Error('QUANTITY_INVALID');
    let errorResponse;
    sinon.stub(salesModels, 'insertSale').resolves(5);
    sinon.stub(productModels, 'getProductById').resolves([true]);

    try {
      await salesServices.insertSale([{ productId: 1, quantity: 0 }]);
    } catch (err) {
      errorResponse = err;
    }
    expect(errorResponse.message).to.be.equal(error.message);
  });
  it('Testa a função Insert Sale sem quantity', async function () {
    const error = new Error('QUANTITY_IS_REQUIRED');
    let errorResponse;
    sinon.stub(salesModels, 'insertSale').resolves(5);
    sinon.stub(productModels, 'getProductById').resolves([true]);

    try {
      await salesServices.insertSale([{ productId: 1 }]);
    } catch (err) {
      errorResponse = err;
    }
    expect(errorResponse.message).to.be.equal(error.message);
  });
  it('Testa a função Insert Sale com productId invalido', async function () {
    const error = new Error('PRODUCT_NOT_FOUND');
    let errorResponse;
    sinon.stub(salesModels, 'insertSale').resolves(5);
    sinon.stub(productModels, 'getProductById').resolves([false]);

    try {
      await salesServices.insertSale([{ productId: 9999999, quantity: 1 }]);
    } catch (err) {
      errorResponse = err;
    }
    expect(errorResponse.message).to.be.equal(error.message);
  });
  afterEach(sinon.restore);
});