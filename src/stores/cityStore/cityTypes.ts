import { Action } from 'redux';

export const CITY_ADD: string = 'CITY_ADD';
export const CITY_DELETE: string = 'CITY_DELETE';

export interface CityProps {
  id: number;
  name: string;
};

export interface CityStateProps {
  cities: CityProps[];
};

export interface CityAddAction extends Action<string> {
  payload: {
    id: number;
    name: string;
  }
};

export interface CityDeleteAction extends Action<string> {
  payload: number;
};

export type CityActionTypes =
  | CityAddAction
  | CityDeleteAction;
