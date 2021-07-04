import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CityInfoProps } from '../../interfaces/CityInfoProps'
import { fetchWeatherDataById, fetchCityForecast } from '../../services/WeatherService';
import { cityAdd, cityDelete, CityProps, CityStateProps, CityActionTypes } from '../../stores/cityStore';
import { CityCard } from "../../components/CityCard";
import { DailyForecast } from "../../components/DailyForecast";

class City extends React.Component<CityPageProps, CityPageState> {
  constructor(props:CityPageProps) {
    super(props);
    this.state = {
      cityName: '',
      isFavorite: false
    }
  }

  componentDidMount() {
    const cityId = parseInt(this.props.match.params.id);
    const cities = this.props.cities;

    fetchWeatherDataById(cityId)
    .then(
      response => {
        const favorite = cities.find((item:CityProps) => item.id === cityId) != null
        this.setState({ 
          cityData: response,
          isFavorite: favorite
        })
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

  handleFavoriteCity = () => {
    const {isFavorite, cityData} = this.state

    if (cityData) {
      const {id, name} = cityData
      if (!isFavorite) {
        this.props.onAddCity(id, name)
      } else {
        this.props.onRemoveCity(id)
      }
      this.setState({
        isFavorite: !isFavorite
      })
    }
  }

  render() {
    const {cityData, isFavorite, dailyForecast} = this.state

    return cityData 
    ? <div>
        <CityCard cityInfo={cityData} isFavorite={isFavorite} onFavoriteClick={this.handleFavoriteCity} /> 
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
  cities: CityProps[];
  onAddCity: (id: number, name: string) => void;
  onRemoveCity: (id: number) => void;
}

interface CityPageState {
  cityName: string;
  isFavorite: boolean;
  cityData?: CityInfoProps;
  dailyForecast?: any
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

export const CityPage = connect(mapStateToProps, mapDispatchToProps)(City)