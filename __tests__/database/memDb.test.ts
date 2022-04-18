import { assert } from 'chai'
import fs from 'fs';

import MemDb from '../../src/database/memDb';

describe('MemDB', () => {
  const dbName = 'test';
  const memDbInstance = new MemDb(dbName);
  const collectionName = 'testCollection';

  describe('Instantiation', () => {
    it('should be an instance of MemDb', () => {
      assert.instanceOf(memDbInstance, MemDb);
    });

    it('should have a dbName', () => {
      assert.equal(memDbInstance.getName(), dbName);
    });
  })

  describe('Collection Creation', () => {
    it('should create a collection', () => {
      memDbInstance.createCollection(collectionName);
      assert.isDefined(memDbInstance.getCollection(collectionName));
    });

    it('should throw an error if collection already exists', () => {
      assert.throws(() => memDbInstance.createCollection(collectionName));
    });

    it('should exist', () => {
      assert.isTrue(memDbInstance.collectionExists(collectionName));
    })
  })

  describe('Get Collection', () => {
    it('should return a collection', () => {
      assert.isDefined(memDbInstance.getCollection(collectionName));
    });

    it('should throw an error if collection does not exist', () => {
      assert.isUndefined(memDbInstance.getCollection('testCollection2'));
    });

    it('should be an object', () => {
      assert.isObject(memDbInstance.getCollection(collectionName));
    })
  })

  describe('Insert Data Into MemDB collection', () => {
    it('Should throw an error if no collection name', () => {
      assert.throws(() => memDbInstance.insert('hello', { id: 555, name: 'test' }));
    });

    it('Should throw an error if data is not an object', () => {
      assert.throws(() => memDbInstance.insert(collectionName, 'test' as any));
    });

    it('Should insert Data into collection with id as key', () => {
      const insertedCollection = memDbInstance.insert(collectionName, { id: 555, name: 'test' });
      assert.equal(insertedCollection.id, 555);
    });

    it('should throw error if id already exists', () => {
      assert.throws(() => memDbInstance.insert(collectionName, { id: '555', name: 'test' }));
    })

    it('Should return object containing inserted Data', () => {
      const insertedCollection = memDbInstance.insert(collectionName, { id: 575, name: 'test' });
      assert.isObject(insertedCollection);
      assert.equal(insertedCollection.id, 575);
    });

    it('Should insert Data into collection with internally generated Key if id not present', () => {
      const inserted = memDbInstance.insert(collectionName, { name: 'Texas' });
      assert.isObject(inserted);
      assert.isDefined(inserted.id);
    });
  });

  describe('Insert bulk Data(Array) of Data) Into MemDB collection #bulkInsert', () => {
    it('Should throw an error if collection does not exist', () => {
      assert.throws(() => memDbInstance.bulkInsert('testCollection2', [{ id: 555, name: 'test' }]));
    });

    it('Should throw an error if data is not an array', () => {
      assert.throws(() => memDbInstance.bulkInsert(collectionName, 'test' as any));
    });

    it('Should return array of objects containing inserted Data', () => {
      const insertedCollections = memDbInstance.bulkInsert(collectionName, [{ id: 585, name: 'test' }]);
      assert.isArray(insertedCollections);
      assert.isObject(insertedCollections[0]);
      assert.equal(insertedCollections[0].id, 585);
    });
  });
  
  describe('Querying All Data from MemDB collection', () => {
    // get array from file
    const data = JSON.parse(fs.readFileSync('./src/database/data/city.list.json', 'utf8'));
    const collection = 'cities';
    memDbInstance.createCollection(collection);
    memDbInstance.bulkInsert(collection, data);
    
    it('Should throw an error if collection is not given', () => {
      assert.throws(() => memDbInstance.findAll('tests'));
    });

    it('Should return the data', () => {
      const data = memDbInstance.findAll(collection);
      assert.isArray(data);
      assert.exists(data[0].name);
    });
  });

  describe('Querying Data from MemDB collection', () => {
    it('Should throw an error if collection is not given', () => {
      assert.throws(() => memDbInstance.findById('tests', 555));
    });

    it('Should return undefined if no document found', () => {
      assert.isUndefined(memDbInstance.findById(collectionName, 'test'));
    });

    it('Should return the data', () => {
      const data = memDbInstance.findById(collectionName, 555);
      assert.isObject(data);
      assert.equal(data?.id, 555);
      assert.equal(data?.name, 'test');
    });

    it('should find by criteria', () => {
      const [data] = memDbInstance.find(collectionName, { id: 555 });
      assert.isObject(data);
      assert.equal(data?.id, 555);
      assert.equal(data?.name, 'test');
    })

    it('should find by criteria and return array', () => {
      const data = memDbInstance.find(collectionName, { name: 'test' });
      assert.isArray(data);
      assert.equal(data[0]?.id, 555);
      assert.equal(data[0]?.name, 'test');
    })
  });
})
