import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('0123456789', 7);

export interface Column {
  id: string | number;
  [key: string]: any;
}

/**
 * A generic in-memory database.
 */
export default class {
  dbName: string;
  collections: Record<string, Record<string, Column>>;
  indexes: Record<string, unknown>;
  constructor(dbName: string) {
    this.dbName = dbName;
    this.collections = {};
    this.indexes = {};
  }

  getName(): string {
    return this.dbName;
  }

  getCollectionNames(): string[] {
    return Object.keys(this.collections);
  }

  getCollection(collectionName: string): Record<string, Column> {
    return this.collections[collectionName];
  }

  createCollection(collectionName: string): void {
    if (this.collectionExists(collectionName)) {
      throw new Error(`Collection ${collectionName} already exists`);
    }
    this.collections[collectionName] = {};
  }

  collectionExists(collectionName: string): boolean {
    return this.collections[collectionName] !== undefined;
  }

  insert(collectionName: string, document: Record<string, unknown>): Record<string, unknown> {
    if (!this.collectionExists(collectionName)) {
      throw new Error(`Collection ${collectionName} does not exist`);
    }
    if (!document || typeof document !== 'object') {
      throw new Error('Document is not an object');
    }
    const collectionData = this.getCollection(collectionName);
    const { id } = document;
    if (id) {
      if (!['string', 'number'].includes(typeof id)) {
        throw new Error(`Document id must be a string or number`);
      }
      if (collectionData[`${id}`]) {
        throw new Error(`Document id ${id} already exists`);
      }
    } else {
      document.id = nanoid();
    }

    collectionData[document.id as string] = document as Column;
    return document;
  }

  bulkInsert(collectionName: string, documents: Record<string, unknown>[]) {
    if (!this.collectionExists(collectionName)) {
      throw new Error(`Collection ${collectionName} does not exist`);
    }
    return documents.map((document) => this.insert(collectionName, document));
  }

  findAll(collectionName: string): Record<string, Column>[] {
    if (!this.collectionExists(collectionName)) {
      throw new Error(`Collection ${collectionName} does not exist`);
    }
    return Object.values(this.getCollection(collectionName));
  }

  findById(collectionName: string, id: string | number): Column | undefined {
    if (!this.collectionExists(collectionName)) {
      throw new Error(`Collection ${collectionName} does not exist`);
    }
    const collectionData = this.getCollection(collectionName);

    return collectionData[id];
  }

  find(collectionName: string, query: Record<string, unknown>): Column[] {
    if (!this.collectionExists(collectionName)) {
      throw new Error(`Collection ${collectionName} does not exist`);
    }
    const collectionData = this.getCollection(collectionName);
    const foundDocuments = Object.values(collectionData).filter((document) => {
      let found = true;
      Object.keys(query).forEach((key) => {
        if (document[key] !== query[key]) {
          found = false;
        }
      });
      return found;
    });
    return foundDocuments;
  }
}
