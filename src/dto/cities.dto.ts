import { Validate, IsNumberString, IsLatitude, IsLongitude } from 'class-validator';
import { IsRequired, TransformToNumber } from '../utils';

export class GetCityByIdDto {
  @Validate(IsRequired)
  @IsNumberString()
  id: string;
}

export class GetCitiesDto {
  @Validate(IsRequired)
  @IsLatitude()
  @TransformToNumber()
  lat: number;

  @Validate(IsRequired)
  @IsLongitude()
  @TransformToNumber()
  lng: number;
}
