const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesServices = require('../../../src/services/salesServices');
const salesController = require('../../../src/controllers/salesController');

describe('Testes de Unidade de Product Controller', function () {
  describe('POST /sales', function () {
    it('Requisição com sucesso', async function () {
      const res = {};

      const req = {
        body: [],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'insertSale').resolves(5);

      await salesController.insertSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 5,
        itemsSold: [],
      })
    });

    it('Requisição com erro', async function () {
      const res = {};
      const req = {
        body: [],
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const error = new Error('INTERNAL_SERVER_ERROR')
      sinon.stub(salesServices, 'insertSale').throws(error);

      await salesController.insertSale(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('GET /sales', function () {
    it('Requisição com sucesso', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'getAllSales').resolves([]);

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([]);
    });

    it('Requisição com erro', async function () {
      const res = {};
      const req = {};
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const error = new Error('INTERNAL_SERVER_ERROR')
      sinon.stub(salesServices, 'getAllSales').throws(error);

      await salesController.getAllSales(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('GET /sales/:id', function () {
    it('Requisição com sucesso', async function () {
      const res = {};
      const req = {
        params: 1,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'getSaleById').resolves([]);

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([]);
    });

    it('Requisição com erro', async function () {
      const res = {};
      const req = {
        params: {
          id: 9999,
        },
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const error = new Error('SALE_NOT_FOUND')
      sinon.stub(salesServices, 'getSaleById').throws(error);

      await salesController.getSaleById(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('DELETE /sales/:id', function () {
    it('Faz uma Requisição com sucesso', async function () {
      const res = {};
      const req = {
        params: {
          id: 1
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'deleteSale').resolves();

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });
    
    it('Faz uma Requisição com id inexistente', async function () {
      const res = {};
      const req = {
        params: {
          id: 9999
        },
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const error = new Error('SALE_NOT_FOUND')
      sinon.stub(salesServices, 'deleteSale').throws(error);

      await salesController.deleteSale(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('PUT /sales/:id', function () {
    it('Faz uma Request com sucesso', async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        },
        body: [],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'updateSale').resolves();

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        saleId: 1,
        itemsUpdated: [],
      });
    });

    it('Faz uma request com erro', async function () {
      const res = {};
      const req = {
        params: {
          id: 9999
        },
        body: [],
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const error = new Error('SALE_NOT_FOUND')
      sinon.stub(salesServices, 'updateSale').throws(error);

      await salesController.updateSale(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });
    afterEach(sinon.restore);
  });

