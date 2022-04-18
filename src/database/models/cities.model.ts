import fs from 'fs';
import Model from './model';

class CityModel extends Model {
  constructor(name: string, seedData?: Record<string, unknown>[]) {
    super(name, seedData);
  }
}

const data = JSON.parse(fs.readFileSync('./src/database/data/city.list.json', 'utf8'));

const City = new CityModel('cities', data);

export default City;
