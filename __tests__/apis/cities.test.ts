import { assert } from 'chai';
import supertest from 'supertest';

import { nockOpenWeatherAPI } from '../utils';
import app from '../../src/app';
const server = supertest.agent(app);

describe('Cities API', () => {
  describe('GET /cities', () => {
    it('should return error if parameters are missing', async () => {
      const res = await server.get('/cities');

      assert.equal(res.status, 400);
      assert.equal(res.body.message, 'lng is a required field');
    })

    it('should return error if parameters are missing', async () => {
      const res = await server.get('/cities?lng=1');

      assert.equal(res.status, 400);
      assert.equal(res.body.message, 'lat is a required field');
    })

    it('should return error if invalid parameters are sent', async () => {
      const res = await server.get('/cities?lng=1&lat=2&limit=a');

      assert.equal(res.status, 400);
      assert.equal(res.body.message, 'property limit should not exist');
    })

    it('should return cities', async () => {
      const res = await server.get('/cities?lng=-0.1337&lat=51.5074');

      assert.equal(res.status, 200);
      assert.equal(res.body.length, 44);
    })
  })

  describe('GET /cities/:id', () => {
    it('should return error if id is invalid', async () => {
      const res = await server.get('/cities/a');

      assert.equal(res.status, 400);
      assert.equal(res.body.message, 'id must be a number string');
    })

    it('should return error if id is not found', async () => {
      const res = await server.get('/cities/999999');

      assert.equal(res.status, 404);
      assert.equal(res.body.message, 'City with given id not found');
    })

    it('should return city', async () => {
      const res = await server.get('/cities/2873891');

      assert.equal(res.status, 200);
      assert.equal(res.body.id, 2873891);
      assert.equal(res.body.name, 'Mannheim');
    })
  })

  describe('GEt /cities/:id/weather', () => {
    it('should return error if id is invalid', async () => {
      const res = await server.get('/cities/a/weather');

      assert.equal(res.status, 400);
      assert.equal(res.body.message, 'id must be a number string');
    })

    it('should return error if id is not found', async () => {
      const res = await server.get('/cities/999999/weather');

      assert.equal(res.status, 404);
      assert.equal(res.body.message, 'City with given id not found');
    })

    it('should return weather', async () => {
      nockOpenWeatherAPI('2873891');
      const res = await server.get('/cities/2873891/weather');

      assert.equal(res.status, 200);
      assert.equal(res.body.type, 'Clear');
      assert.equal(res.body.type_description, 'clear sky');
      assert.equal(res.body.temp, '279.7');
    })
  });
})
