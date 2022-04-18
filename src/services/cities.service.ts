import { httpErrors } from '../lib';
import { GetCitiesDto, GetCityByIdDto } from '../dto';
import { City } from '../database/models';
import { isWithinRadius, getWeather } from '../utils';

export const getCity = (dto: GetCityByIdDto) => {
  const { id } = dto;
  const city = City.findById(id);
  if (!city) {
    throw new httpErrors.ResourceNotFoundError('City with given id not found');
  }
  return city;
};

export const getCitiesWithinRadius = (dto: GetCitiesDto) => {
  const cities = City.findAll().filter((city) => {
    const location = {
      lat: city.coord.lat,
      lng: city.coord.lon,
    };
    return isWithinRadius(dto, location, 10);
  });
  return cities;
};

export const getCityWeather = async (dto: GetCityByIdDto) => {
  const { id } = dto;
  const city = City.findById(id);
  if (!city) {
    throw new httpErrors.ResourceNotFoundError('City with given id not found');
  }
  return getWeather(id);
};
