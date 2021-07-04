import React, { FC } from 'react';
import { 
  makeStyles,  
  createStyles, 
  Card
} from '@material-ui/core';
import { DailyForecastProps } from '../../services/WeatherService'

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      padding: 16,
      marginTop: 24,
      display: 'flex',
      justifyContent: 'space-between'
    },
    temp: {
      fontSize: 20
    }
  }),
);

export const DailyForecast: FC<DailyForecastProps> = ({ daily }) => {
  const classes = useStyles();

  return <Card className={classes.card}>
    {
      daily.map(
        (item: any) => {
          const { date, iconUrl, description, temp } = item
          return <div>
            <div>{date}</div>
            <img src={iconUrl} alt={description} />
            <div className={classes.temp}>{Math.floor(temp)}°C</div>
          </div>
        }
      )
    }
  </Card>
}