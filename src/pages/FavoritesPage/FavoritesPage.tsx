import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { cityDelete, CityProps, CityStateProps, CityActionTypes } from '../../stores/cityStore';
import { CityFavorites } from "../../components/CityFavorites"

class Favorites extends React.Component<FavoritesProps> {
  render() {
    return (
      this.props.cities.length > 0 && <CityFavorites items={this.props.cities} onDelete={this.props.onRemoveCity} />
    )
  }
}

interface FavoritesProps {
  cities: CityProps[],
  onRemoveCity: (id: number) => void
}

const mapStateToProps = (state: CityStateProps) => {
  return {
    cities: state.cities
  };
};

const mapDispatchToProps = (dispatch: Dispatch<CityActionTypes>) => {
  return {
    onRemoveCity: (id: number) => dispatch(cityDelete(id))
  };
};

export const FavoritesPage = connect(mapStateToProps, mapDispatchToProps)(Favorites)