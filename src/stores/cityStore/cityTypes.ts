import { Action } from 'redux';
import { CityInfoProps } from '../../interfaces/CityInfoProps';

export const CITY_ADD: string = 'CITY_ADD';
export const CITY_DELETE: string = 'CITY_DELETE';

export interface CityStateProps {
  cities: CityInfoProps[];
};

export interface CityAddAction extends Action<string> {
  payload: CityInfoProps
};

export interface CityDeleteAction extends Action<string> {
  payload: number;
};

export type CityActionTypes =
  | CityAddAction
  | CityDeleteAction;
