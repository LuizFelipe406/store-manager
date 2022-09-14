const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const salesServices = require('../../../src/services/salesServices');
const salesModels = require('../../../src/models/salesModels');
const productModels = require('../../../src/models/productModels');

describe('Testes de Unidade de Sales Services', function () {
  describe('Função insertSale', function () {
    it('com sucesso', async function () {
    sinon.stub(salesModels, 'insertSale').resolves(5);
    sinon.stub(productModels, 'getProductById').resolves([true]);

    const response = await salesServices.insertSale([{ productId: 1, quantity: 1 }]);

    expect(response).to.be.equal(5);
  });

  it('sem productId', async function () {
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

  it('com quantity invalida', async function () {
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

  it('sem quantity', async function () {
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

  it('com productId invalido', async function () {
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
  });
  
  describe('Função getAllSales', function () {
    it('Com sucesso', async function () {
      sinon.stub(salesModels, 'getAllSales').resolves([{
        todas_as_vendas: []
      }]);

      const response = await salesServices.getAllSales();

      expect(response).to.be.deep.equal({todasAsVendas: []});
    });

    it('Com erro', async function () {
      const error = new Error('INTERNAL_SERVER_ERROR');
      let errorReponse;
      sinon.stub(salesModels, 'getAllSales').resolves([undefined]);

      try {
        await salesServices.getAllSales();
      } catch (err) {
        errorReponse = err;
      }

      expect(errorReponse.message).to.be.equal(error.message);
    });
  });

  describe('Função getSalesById', function () {
    it('Com Sucesso', async function () {
      sinon.stub(salesModels, 'getSaleById').resolves(['venda com id 1']);

      const response = await salesServices.getSaleById(1);

      expect(response).to.be.equal('venda com id 1');
    });

    it('Com Erro', async function () {
      const error = new Error('SALE_NOT_FOUND');
      let errorReponse;
      sinon.stub(salesModels, 'getSaleById').resolves([[]]);

      try {
        await salesServices.getSaleById(9999);
      } catch (err) {
        errorReponse = err;
      }

      expect(errorReponse.message).to.be.equal(error.message);
    });
  });

  describe('Função deleteSale', function () {
    it('Testa a função com sucesso', async function () {
      sinon.stub(salesModels, 'deleteSale').resolves({ affectedRows: 1 });

      const response = await salesServices.deleteSale(1);

      expect(response).to.be.equal(true);
    });
    it('Testa a função com id inexistente', async function () {
      const error = new Error('SALE_NOT_FOUND');
      let errorReponse;
      sinon.stub(salesModels, 'deleteSale').resolves({ affectedRows: 0 });

      try {
        await salesServices.deleteSale(9999);
      } catch (err) {
        errorReponse = err;
      }
      expect(errorReponse.message).to.be.equal(error.message);
    });
  });

  describe('Função updateSale', function () {
    it('com sucesso', async function () {
      sinon.stub(productModels, 'getProductById').resolves([true]);
      sinon.stub(salesModels, 'getSaleById').resolves([['venda']]);
      sinon.stub(salesModels, 'updateSale').resolves();

      const response = await salesServices.updateSale(1, [{
        productId: 1,
        quantity: 1,
      }]);

      expect(response).to.be.equal(true);
    });
    it('com erro na request', async function () {
      sinon.stub(productModels, 'getProductById').resolves([true]);
      sinon.stub(salesModels, 'getSaleById').resolves([['venda']]);
      sinon.stub(salesModels, 'updateSale').resolves();
      const error = new Error('PRODUCT_ID_IS_REQUIRED');
      let errorResponse;

      try {
        await salesServices.updateSale(1, [{
        quantity: 1,
      }]);
      } catch (err) {
        errorResponse = err;
      }

      expect(errorResponse.message).to.be.equal(error.message);
    });
    it('com id da venda inexistente', async function () {
      sinon.stub(productModels, 'getProductById').resolves([true]);
      sinon.stub(salesModels, 'getSaleById').resolves([[]]);
      sinon.stub(salesModels, 'updateSale').resolves();
      const error = new Error('SALE_NOT_FOUND');
      let errorResponse;

      try {
        await salesServices.updateSale(1, [{
        productId: 1,
        quantity: 1,
      }]);
      } catch (err) {
        errorResponse = err;
      }

      expect(errorResponse.message).to.be.equal(error.message);
    });
  });

  afterEach(sinon.restore);
});