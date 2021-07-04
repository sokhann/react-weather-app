import {
  CITY_ADD,
  CITY_DELETE,
  CityAddAction,
  CityActionTypes,
  CityStateProps,
} from './cityTypes';

const initialState: CityStateProps = {
  cities: [],
};

export const cityReducers = (state = initialState, action: CityActionTypes): CityStateProps => {
  switch (action.type) {
    case CITY_ADD:
      const addAction = action as CityAddAction
      return {
        ...state,
        cities: [
          ...state.cities,
          {
            id: addAction.payload.id,
            name: addAction.payload.name,
          },
        ]
      };

    case CITY_DELETE:
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload),
      };

    default:
      return state;
  }
};