const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const productServices = require('../../../src/services/productServices');
const productModels = require('../../../src/models/productModels');

describe('Testes de Unidade de Product Services', function () {
  describe('Testa a função getAllProducts', function () {
    it('Com sucesso', async function () {
      sinon.stub(productModels, 'getAllProducts').resolves([]);

      const response = await productServices.getAllProducts();

      expect(response).to.be.deep.equal([]);
    });

    it('Com erro', async function () {
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
  });
 
  describe('Testa a função getProductsById', function () {
    it('Com sucesso', async function () {
      sinon.stub(productModels, 'getProductById').resolves(['primeiro produto']);

      const response = await productServices.getProductById(1);

      expect(response).to.be.equal('primeiro produto');
  });

    it('Com um id Invalido', async function () {
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
  });
 
  describe('Testa a função insertProducts', function () {
    it('Com sucesso', async function () {
      sinon.stub(productModels, 'insertProduct').resolves({ insertId: 5 });

      const response = await productServices.insertProduct('Produto de Teste');

      expect(response).to.be.equal(5);
  });

    it('Com erro', async function () {
      const error = new Error('INTERNAL_SERVER_ERROR');
      let responseError = null;

      sinon.stub(productModels, 'insertProduct').resolves({ insertId: undefined });

      try {
        await productServices.insertProduct('Produto Invalido');
      } catch (err) {
        responseError = err;
      }

      expect(responseError.message).to.be.equal(error.message);
    });
    
    it('Sem name', async function () {
      const error = new Error('NAME_IS_REQUIRED');
      let responseError = null;

      try {
        await productServices.insertProduct();
      } catch (err) {
        responseError = err;
      }

      expect(responseError.message).to.be.equal(error.message);
    });
    it('Com name < 5', async function () {
      const error = new Error('NAME_IS_TOO_SMALL');
      let responseError = null;

      try {
        await productServices.insertProduct('1234');
      } catch (err) {
        responseError = err;
      }

      expect(responseError.message).to.be.equal(error.message);
    });
  });
  
  describe('Testa a função updateProducts', function () {
    it('Com sucesso', async function () {
      sinon.stub(productModels, 'updateProduct').resolves({ affectedRows: 1 });

      const response = await productServices.updateProduct(1, 'Produto Atualizado');

      expect(response).to.be.equal(true);
    });

    it('Com id inexistente', async function () {
      const error = new Error('PRODUCT_NOT_FOUND');
      let errorResponse;
      sinon.stub(productModels, 'updateProduct').resolves({ affectedRows: 0 });

      try {
        await productServices.updateProduct(9999, 'Produto com Erro');
      } catch (err) {
        errorResponse = err;
      }

      expect(errorResponse.message).to.be.equal(error.message);
    });

    it('Sem name', async function () {
      const error = new Error('NAME_IS_REQUIRED');
      let responseError = null;

      try {
        await productServices.updateProduct();
      } catch (err) {
        responseError = err;
      }

      expect(responseError.message).to.be.equal(error.message);
    });

    it('Com name < 5', async function () {
      const error = new Error('NAME_IS_TOO_SMALL');
      let responseError = null;

      try {
        await productServices.insertProduct('1234');
      } catch (err) {
        responseError = err;
      }

      expect(responseError.message).to.be.equal(error.message);
    });
  });

  describe('Testa a função deleteProduct', function () {
    it('Com sucesso', async function () {
      sinon.stub(productModels, 'deleteProduct').resolves({ affectedRows: 1 })

      const response = await productServices.deleteProduct(1);

      expect(response).to.be.equal(true);
    });

    it('Com id Inexistente', async function () {
      const error = new Error('PRODUCT_NOT_FOUND');
      let errorResponse;
      sinon.stub(productModels, 'deleteProduct').resolves({ affectedRows: 0 });

      try {
        await productServices.deleteProduct(9999);
      } catch (err) {
        errorResponse = err;
      }

      expect(errorResponse.message).to.be.equal(error.message);
    });
  });

  afterEach(sinon.restore)
});