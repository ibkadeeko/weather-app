import { assert } from 'chai';

import Model from '../../src/database/models/model';

describe('Model', () => {
  const TestModel = new Model('test1');

  describe('Model Instantiation', () => {
    it('should be an instance of Model', () => {
      assert.instanceOf(TestModel, Model);
    });

    it('should have a name', () => {
      assert.equal(TestModel.getName(), 'test1');
    });

    it('should create a memDB collection', () => {
      const init = TestModel.init();
      assert.isTrue(init);
    })
  })

  describe('Model Methods', () => {
    it('should insert data', () => {
      const data = { id: 555, name: 'test' };
      const insertedData = TestModel.insert(data);
      assert.deepEqual(insertedData, data);
    })

    it('should insert multiple data', () => {
      const data = [{ id: 556, name: 'test1' }, { id: 557, name: 'test2' }];
      const insertedData = TestModel.bulkInsert(data);
      assert.deepEqual(insertedData, data);
    })

    it('should get data by id', () => {
      const foundData = TestModel.findById(555);
      assert.equal(foundData?.id, 555);
      assert.equal(foundData?.name, 'test');
    });

    it('should get record by query', () => {
      const [foundData] = TestModel.findWhere({ id: 555 });
      assert.equal(foundData.id, 555);
      assert.equal(foundData.name, 'test');
    })

    it('should get all records', () => {
      const foundData = TestModel.findAll();
      assert.equal(foundData.length, 3);
    });
  })
})
