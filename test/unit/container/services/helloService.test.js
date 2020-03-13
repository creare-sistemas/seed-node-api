const { expect, sinon } = require('../../helpers');
const HelloService = require('../../../../src/container/services/helloService');
const { helloHelper } = require('../../../../src/helpers');
const knex = require('knex');

const databaseFake = knex('null');

const helloFake = {
  helloId: 1,
  helloName: 'Mensagem de Bom dia',
  helloText: 'Bom dia Creare Sistemas',
  createdAt: '2020-02-12T18:52:03.638Z',
  updatedAt: '2020-02-12T18:52:03.638Z',
};

const helloFakeList = [helloFake];

const helloDataFake = {
  helloName: 'Mensagem de Bom dia',
  helloText: 'Bom dia Creare Sistemas',
};

describe('helloService', () => {
  describe('#create()', () => {
    it('should work when create a hello', async () => {
      const sandbox = sinon.createSandbox();
      const helloModelFake = {
        database: databaseFake,
        create: sinon.fake(() => {
          return { transacting: sinon.stub().resolves(helloFakeList) };
        }),
        getByText: sinon.fake(() => {
          return { transacting: sinon.stub().resolves({}) };
        }),
      };

      sinon.stub(helloHelper, 'convertToHelloResponse').returns(helloFake);
      sinon.stub(helloHelper, 'validationAlreadyExists').returns();

      // @ts-ignore
      const helloService = new HelloService({
        // @ts-ignore
        helloModel: helloModelFake,
      });

      const result = await helloService.createHello(helloDataFake);
      expect(result).to.be.a('object');
      expect(result.helloId).to.have.equal(helloFake.helloId, 1);
      expect(result.helloText).to.have.equal(helloFake.helloText);
      sandbox.restore();
    });
  });
});
