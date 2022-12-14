const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productServices = require('../../../src/services/productServices');
const productController = require('../../../src/controllers/productController');

describe('Testes de Unidade de Product Controller', function () {
  describe('GET /products', function () {
    it('Retorna todos os produtos', async function () {
      const res = {};

      const req = {};

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(productServices, 'getAllProducts').resolves([]);

      await productController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);

      expect(res.json).to.have.been.calledWith([]);
    })

    it('Simula um erro ao requerir todos os produtos', async function () {
      const res = {};

      const req = {};

      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      const error = new Error('INTERNAL_SERVER_ERROR')
      sinon.stub(productServices, 'getAllProducts').throws(error);

      await productController.getProducts(req, res, next);

      expect(next).to.have.been.calledWith(error);
    })
  });

  describe('GET /products/:id', function () {
    it('Retorna um Produto por um ID', async function () {
      const res = {};

      const req = {
        params: {
          id: 1,
      }};

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(productServices, 'getProductById').resolves([]);

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);

      expect(res.json).to.have.been.calledWith([]);
  })

    it('Simula uma Requisição com id Inexistente', async function () {
      const res = {};

      const req = {
        params: {
          id: 999999,
      }};
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      const error = new Error('PRODUCT_NOT_FOUND');
      sinon.stub(productServices, 'getProductById').throws(error);

      await productController.getProductById(req, res, next);

      expect(next).to.have.been.calledWith(error);
  })
  });

  describe('POST /products', function () {
    it('Simula um requisição com sucesso', async function () {
      const res = {};
      const req = {
        body: {
          name: 'Produto de Teste',
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productServices, 'insertProduct').resolves(5);

      await productController.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 5,
        name: 'Produto de Teste',
      })
    });

    it('Simula uma requisição com erro', async function () {
      const res = {};
      const req = {
        body: {
          name: 'Produto de Teste',
        }
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const error = new Error('INTERNAL_SERVER_ERROR');
      sinon.stub(productServices, 'insertProduct').throws(error);
      
      await productController.insertProduct(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });
  

  describe('PUT /products/:id', function () {
    it('Simula uma requisição com sucesso', async function () {
      const res = {};
      const req = {
        body: {
          name: 'Produto Atualizado',
        },
        params: {
          id: 1,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productServices, 'updateProduct').resolves();

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        name: 'Produto Atualizado',
      })
    });
    
    it('Simula um requisição com erro', async function () {
      const res = {};
      const req = {
        body: {
          name: 'Produto com Erro',
        },
        params: {
          id: 9999,
        }
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const error = new Error('INTERNAL_SERVER_ERROR');
      sinon.stub(productServices, 'updateProduct').throws(error);
      
      await productController.updateProduct(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('DELETE /products/:id', function () {
    it('Faz uma Requisição com sucesso', async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productServices, 'deleteProduct').resolves();

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('Faz uma Requisição com id inexistente', async function () {
      const res = {};
      const req = {
        params: {
          id: 9999,
        }
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const error = new Error('PRODUCT_NOT_FOUND');
      sinon.stub(productServices, 'deleteProduct').throws(error);
      
      await productController.deleteProduct(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('GET /products/sales', function () {
    it('Faz uma requisição com sucesso', async function () {
      const res = {};

      const req = {
        query: {
          q: 'produto',
      }};

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(productServices, 'getProductsByTerm').resolves([]);

      await productController.getProductsByTerm(req, res);

      expect(res.status).to.have.been.calledWith(200);

      expect(res.json).to.have.been.calledWith([]);
    });

    it('Faz uma requisição com sucesso e query vazia', async function () {
      const res = {};

      const req = {
        query: {
          q: '',
      }};

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(productServices, 'getAllProducts').resolves([]);

      await productController.getProductsByTerm(req, res);

      expect(res.status).to.have.been.calledWith(200);

      expect(res.json).to.have.been.calledWith([]);
    });
    it('Faz uma Requisição com query invalida', async function () {
      const res = {};

      const req = {
        query: {
          q: 'produto inexistente',
      }};
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      const error = new Error('PRODUCT_NOT_FOUND');
      sinon.stub(productServices, 'getProductsByTerm').throws(error);

      await productController.getProductsByTerm(req, res, next);

      expect(next).to.have.been.calledWith(error);
  })
  });

  afterEach(sinon.restore);
})