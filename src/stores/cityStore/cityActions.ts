import {
  CITY_ADD,
  CITY_DELETE,
  CityAddAction,
  CityDeleteAction
} from './cityTypes';

export const cityAdd = (id: number, name: string): CityAddAction => {
  return {
    type: CITY_ADD,
    payload: {id, name},
  };
};

export const cityDelete = (id: number): CityDeleteAction => {
  return {
    type: CITY_DELETE,
    payload: id,
  };
};
