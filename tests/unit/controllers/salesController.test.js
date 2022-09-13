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
  })
  afterEach(sinon.restore);
});