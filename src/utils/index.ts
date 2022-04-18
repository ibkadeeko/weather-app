import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Transform } from 'class-transformer';
import axios from 'axios';
import { apiRequestLogger, httpErrors } from '../lib';

import { envStore } from '../env';
@ValidatorConstraint({ name: 'isRequiredField', async: false })
export class IsRequired implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return value !== undefined && value !== null && value !== '';
  }
  defaultMessage(args: ValidationArguments): string {
    return `$property is a required field`;
  }
}

export const TransformToLowerCase = (): PropertyDecorator => {
  return Transform(({ value }) => (value as string).toLowerCase());
};

export const TransformToNumber = (): PropertyDecorator =>
  Transform(({ value }) => (value === undefined ? (value as undefined) : +value));

const { asin, cos, sin, sqrt, PI } = Math;
const EARTH_RADIUS_KM = 6371;

const toRad = (deg: number) => deg * (PI / 180);
const squared = (n: number) => n * n;
const hav = (x: number) => squared(sin(x / 2));

type LatLng = {
  lat: number;
  lng: number;
};

export const haversineDistance = (point: LatLng, location: LatLng) => {
  const lat1 = toRad(point.lat);
  const lng1 = toRad(point.lng);
  const lat2 = toRad(location.lat);
  const lng2 = toRad(location.lng);

  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;

  const a = hav(dLat) + cos(lat1) * cos(lat2) * hav(dLng);
  const c = 2 * asin(sqrt(a));

  return EARTH_RADIUS_KM * c;
};

export const isWithinRadius = (point: LatLng, location: LatLng, radius: number) => {
  return haversineDistance(point, location) <= radius;
};

export const formatWeatherResponse = (data: any) => {
  return {
    type: data.weather[0].main,
    type_description: data.weather[0].description,
    sunrise: new Date(data.sys.sunrise * 1000).toISOString(),
    sunset: new Date(data.sys.sunset * 1000).toISOString(),
    temp: data.main.temp,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    clouds_percent: data.clouds.all,
    wind_speed: data.wind.speed,
  };
};

export const getWeather = async (id: string) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${envStore.OPEN_WEATHER_API_KEY}`
    );
    return formatWeatherResponse(data);
  } catch (err) {
    if (err.response) {
      apiRequestLogger.error(err.response.data);
      throw new httpErrors.InternalError(err.response.data.message);
    } else if (err.request) {
      apiRequestLogger.error(err.request);
      throw new httpErrors.InternalError(err.request);
    } else {
      apiRequestLogger.error(err.message);
      throw new httpErrors.InternalError(err.message);
    }
  }
};
