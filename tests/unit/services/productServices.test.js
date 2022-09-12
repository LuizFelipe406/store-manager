const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const productServices = require('../../../src/services/productServices');
const productModels = require('../../../src/models/productModels');

describe('Verificando service de products', function () {
  it('Testa a função getAllProducts com sucesso', async function () {
    sinon.stub(productModels, 'getAllProducts').resolves([]);

    const response = await productServices.getAllProducts();

    expect(response).to.be.deep.equal([]);
  });

  it('Testa a função getAllProducts com erro', async function () {
    const error = new Error('INTERNAL_SERVER_ERROR');
    let responseError = null;

    sinon.stub(productModels, 'getAllProducts').resolves(undefined);

    try {
      await productServices.getAllProducts();
    } catch (error) {
      responseError = error;
    }
    expect(responseError.message).to.be.equal(error.message);
  });

  it('Testa a função getProductById com sucesso', async function () {
    sinon.stub(productModels, 'getProductById').resolves(['primeiro produto']);

    const response = await productServices.getProductById(1);

    expect(response).to.be.equal('primeiro produto');
  });

  it('Testa a função getProductsById com um id Invalido', async function () {
    const error = new Error('PRODUCT_NOT_FOUND');
    let responseError = null;

    sinon.stub(productModels, 'getProductById').resolves([undefined]);

    try {
      await productServices.getProductById(99999);
    } catch (error) {
      responseError = error;
    }
  expect(responseError.message).to.be.equal(error.message);
  });

  afterEach(sinon.restore)
});