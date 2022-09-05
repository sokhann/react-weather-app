import {
  CITY_ADD,
  CITY_DELETE,
  CityAddAction,
  CityDeleteAction
} from './cityTypes';
import { CityInfoProps } from '../../interfaces/CityInfoProps';

export const cityAdd = (city: CityInfoProps): CityAddAction => {
  return {
    type: CITY_ADD,
    payload: city,
  };
};

export const cityDelete = (id: number): CityDeleteAction => {
  return {
    type: CITY_DELETE,
    payload: id,
  };
};
