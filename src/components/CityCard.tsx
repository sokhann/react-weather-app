import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { 
  makeStyles,  
  createStyles, 
  Card,
  CardHeader,
  CardContent,
  IconButton
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { cityAdd, cityDelete, CityStateProps, CityActionTypes } from '../stores/cityStore';

import { CityInfoProps } from '../interfaces/CityInfoProps'

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      position: 'relative',
      padding: 16
    },
    info: {
      display: 'flex',
      alignItems: 'center'
    },
    temperature: {
      fontSize: 32
    },
    description: {
      textTransform: 'uppercase',
      marginLeft: 16
    },
    iconButton: {
      position: 'absolute',
      top: 8,
      right: 4
    },
    header: {
      padding: '0 0 16px',
      borderBottom: '1px solid #999999'
    },
    content: {
      padding: '0 !important'
    },
    actions: {
      padding: 0
    }
  }),
);

interface CityCardProps {
  cityInfo: CityInfoProps
  cities: CityInfoProps[]
  onAddCity: (city: CityInfoProps) => void
  onRemoveCity: (id: number) => void
}

const CityCard: FC<CityCardProps> = ({ cityInfo, cities, onAddCity, onRemoveCity }) => {
  const classes = useStyles();
  const { id, name, country, temperature, description, humidity, windSpeed, iconUrl } = cityInfo

  const isFavorite = cities.find((item:CityInfoProps) => item.id === id) != null

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
  
    if (!isFavorite) {
      onAddCity(cityInfo)
    } else {
      onRemoveCity(id)
    }
  }

  return <Link to={`/city/${cityInfo.id}`}>
    <Card className={classes.card}>
      <IconButton  className={classes.iconButton} aria-label="add to favorites" onClick={handleFavoriteClick}>
        { isFavorite ? <StarIcon /> : <StarBorderIcon /> }
      </IconButton>
      <CardHeader
        title={name}
        subheader={country}
        className={classes.header}
      />
      <CardContent className={classes.content}>
        <p className={classes.info}>
          <span className={classes.temperature}>{ Math.floor(temperature)}°C</span>
          { iconUrl && <img src={ iconUrl } alt={ description } />}
          <span className={classes.description}>{ description }</span>
        </p>
        <p>Humidity: { humidity }%</p>
        <p>Wind: { windSpeed }m/s</p>
      </CardContent>
    </Card>
  </Link>
}


const mapStateToProps = (state: CityStateProps) => {
  return {
    cities: state.cities
  };
};

const mapDispatchToProps = (dispatch: Dispatch<CityActionTypes>) => {
  return {
    onAddCity: (city: CityInfoProps) => dispatch(cityAdd(city)),
    onRemoveCity: (id: number) => dispatch(cityDelete(id))
  };
}

export const CityCardComponent = connect(mapStateToProps, mapDispatchToProps)(CityCard)