import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux'

import { CitySearch } from "../../components/CitySearch"
import { cityAdd, cityDelete, CityProps, CityStateProps, CityActionTypes } from '../../stores/cityStore';

class Home extends React.Component<HomeProps> {
  render() {
    return <div>
      <CitySearch 
        favoriteCities={this.props.cities}
        onAddCity={this.props.onAddCity}
        onRemoveCity={this.props.onRemoveCity}
      />
    </div>
  }
}

interface HomeProps {
  cities: CityProps[],
  onAddCity: (id: number, name: string) => void
  onRemoveCity: (id: number) => void
}

const mapStateToProps = (state: CityStateProps) => {
  return {
    cities: state.cities
  };
};

const mapDispatchToProps = (dispatch: Dispatch<CityActionTypes>) => {
  return {
    onAddCity: (id: number, name: string) => dispatch(cityAdd(id, name)),
    onRemoveCity: (id: number) => dispatch(cityDelete(id))
  };
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(Home)