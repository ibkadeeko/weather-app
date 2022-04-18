import { Request, Response } from 'express';
import { successResponse, validate } from '../lib';
import { GetCitiesDto, GetCityByIdDto } from '../dto';
import { getCity, getCitiesWithinRadius, getCityWeather } from '../services';

export const getCities = async (req: Request, res: Response) => {
  const dto = await validate<GetCitiesDto>(req.query, GetCitiesDto);
  const data = getCitiesWithinRadius(dto);
  return successResponse({ res, data });
};

export const getCityById = async (req: Request, res: Response) => {
  const dto = await validate<GetCityByIdDto>(req.params, GetCityByIdDto);
  const data = getCity(dto);
  return successResponse({ res, data });
};

export const getCityWeatherById = async (req: Request, res: Response) => {
  const dto = await validate<GetCityByIdDto>(req.params, GetCityByIdDto);
  const data = await getCityWeather(dto);
  return successResponse({ res, data });
};
