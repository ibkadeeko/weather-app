import express from 'express';
import { getCityById, getCities, getCityWeatherById } from '../controllers';

const router = express.Router();

router.get('/', getCities);

router.get('/:id', getCityById);

router.get('/:id/weather', getCityWeatherById);

export default router;
