import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { CityInfoProps } from '../interfaces/CityInfoProps'
import { fetchWeatherDataById, fetchCityForecast } from '../services/WeatherService';
import { CityCard, DailyForecast } from "../components";

export class CityPage extends React.Component<CityPageProps, CityPageState> {
  constructor(props:CityPageProps) {
    super(props);
    this.state = {
      cityName: ''
    }
  }

  componentDidMount() {
    const cityId = parseInt(this.props.match.params.id);

    fetchWeatherDataById(cityId)
    .then(
      response => {
        this.setState({ cityData: response })
        this.handleDailyForecast(response.lat, response.lon)
      }
    )
  }

  handleDailyForecast = (lat: number, lon: number) => {
    fetchCityForecast(lat, lon)
    .then(
      data => this.setState({ dailyForecast: data })
    )
  }

  render() {
    const {cityData, dailyForecast} = this.state

    return cityData 
    ? <div>
        <Button
          variant="contained"
          color="default"
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <CityCard cityInfo={cityData} /> 
        {
          dailyForecast 
          ? <DailyForecast daily={dailyForecast} />
          : null
        }
      </div>
    : null
  }
}

interface MatchParams {
  id: string;
}

interface CityPageProps extends RouteComponentProps<MatchParams> {
}

interface CityPageState {
  cityName: string;
  cityData?: CityInfoProps;
  dailyForecast?: any
}