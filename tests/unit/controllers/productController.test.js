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
  

  afterEach(sinon.restore);
})