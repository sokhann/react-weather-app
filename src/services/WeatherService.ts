import moment from 'moment'

const API_KEY: string = '73efba092715a3960a70bf1cdace5473';
const SEARCH_CITY_URL: string = 'http://api.openweathermap.org/data/2.5/weather';
const CITY_FORECAST_URL: string = 'https://api.openweathermap.org/data/2.5/onecall'

const parseData = (data: WeatherResponseProps) => {
  return {
    id: data.id,             
    name: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    windSpeed: data.wind.speed,
    lat: data.coord.lat,
    lon: data.coord.lon,
    iconUrl: data.weather[0].icon && `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
  }
}

const parseForecastData = (data: DailyForecastProps) => {
  const { daily } = data
  const dailyData: DayProps[] = []

  daily.forEach(item => {
    const date = moment.unix(item.dt).format("DD.MM.YY")
    const day = {
      date: date,
      iconUrl: item.weather[0].icon && `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
      description: item.weather[0].description,
      temp: item.temp.day
    }
    dailyData.push(day)
  });

  return dailyData
}

export function fetchWeatherDataByName(query: string) {
  const url = `${SEARCH_CITY_URL}?q=${query}&units=metric&appid=${API_KEY}`
  return fetch(url)
    .then(response => response.json())
    .then((data: WeatherResponseProps) => parseData(data))
    .catch((error) => { throw new Error(error) });
}

export function fetchWeatherDataById(id: number) {
  const url = `${SEARCH_CITY_URL}?id=${id}&units=metric&appid=${API_KEY}`
  return fetch(url)
    .then(response => response.json())
    .then((data: WeatherResponseProps) => parseData(data))
    .catch((error) => { throw new Error(error) });
}

export function fetchCityForecast(lat: number, lon: number) {
  const url = `${CITY_FORECAST_URL}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`
  return fetch(url)
    .then(response => response.json())
    .then((data) => parseForecastData(data))
    .catch((error) => { throw new Error(error) });
}

export interface WeatherResponseProps {
  id: number;
  base: string;
  name: string;
  timezone: number;
  dt: number;
  coord: WeatherResponsePropsFieldCoord;
  weather: WeatherResponsePropsFieldWeather[];
  main: WeatherResponsePropsFieldMain;
  visibility: number;
  wind: WeatherResponsePropsFieldWind;
  clouds: WeatherResponsePropsFieldClouds;
  sys: WeatherResponsePropsFieldSys;
  cod: number;
};

export interface DayProps {
  date: string
  iconUrl: string
  description: string
  temp: number
}

export interface DailyForecastProps {
  daily: DayForecastProps[]
  lat?: number
  lon?: number
}

interface DayForecastProps {
  dt: number
  weather: WeatherResponsePropsFieldWeather[]
  temp: {
    day: number
    eve: number
    max: number
    min: number
    morn: number
    night: number
  }
}

interface WeatherResponsePropsFieldCoord {
  lon: number;
  lat: number;
};

interface WeatherResponsePropsFieldWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
};

interface WeatherResponsePropsFieldMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

interface WeatherResponsePropsFieldWind {
  speed: number;
};

interface WeatherResponsePropsFieldClouds {
  all: number;
};

interface WeatherResponsePropsFieldSys {
  id: number;
  type: number;
  country: string;
  sunrise: number;
  sunset: number;
};
