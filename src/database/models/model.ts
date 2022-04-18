import MemDb from '../memDb';

const DB = new MemDb('weather-app');

export default class {
  name: string;
  DB: MemDb;
  seedData: Record<string, unknown>[] | undefined;
  constructor(name: string, seedData?: Record<string, unknown>[]) {
    this.name = name;
    this.DB = DB;
    this.seedData = seedData;
    this.init();
  }

  init(): boolean {
    if (!this.name) {
      throw new Error('Model name is required');
    }
    if (!this.DB) {
      throw new Error('Database is required');
    }
    if (!this.DB.collectionExists(this.name)) {
      this.DB.createCollection(this.name);
    }
    if (this.seedData?.length) {
      this.bulkInsert(this.seedData);
    }
    return this.DB.collectionExists(this.name);
  }

  getName() {
    return this.name;
  }

  getModel() {
    return this;
  }

  findAll() {
    return this.DB.findAll(this.name);
  }

  findById(id: string | number) {
    return this.DB.findById(this.name, id);
  }

  findWhere(query: Record<string, unknown>) {
    return this.DB.find(this.name, query);
  }

  insert(document: Record<string, unknown>) {
    return this.DB.insert(this.name, document);
  }

  bulkInsert(documents: Record<string, unknown>[]) {
    return this.DB.bulkInsert(this.name, documents);
  }
}
