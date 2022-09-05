import React, {FC} from 'react';
import { connect } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core';

import { CityStateProps } from '../stores/cityStore';
import { CityCard } from "../components"
import { CityInfoProps } from '../interfaces/CityInfoProps'

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '16px'
    }
  }),
);

const Favorites: FC<FavoritesProps> = ({ cities }) => {
  const classes = useStyles();

  return <div className={classes.list}>
    {
      cities.length > 0 
      ? cities.map(
        city => <CityCard key={city.id} cityInfo={city} />
      )
      : <p>Empty</p>
    }
  </div>
}
interface FavoritesProps {
  cities: CityInfoProps[],
}

const mapStateToProps = (state: CityStateProps) => {
  return {
    cities: state.cities
  };
};

export const FavoritesPage = connect(mapStateToProps, {})(Favorites)