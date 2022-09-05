import React, { FC, useState } from 'react';
import { makeStyles, createStyles, Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'

import { fetchWeatherDataByName } from '../services/WeatherService';
import { CityInfoProps } from '../interfaces/CityInfoProps'
import { CityCard } from "../components";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    search: {
      padding: '2px 4px',
      margin: '0 0 16px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    results: {
      padding: 16,
    }
  }),
);

export const CitySearch: FC = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState<CityInfoProps | null>(null)

  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchCity = (searchValue: string) => {
    fetchWeatherDataByName(searchValue)
    .then(
      result => setSearchResult(result)
    )  
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      handleSearchCity(searchValue)
    }
  }

  return <div className={classes.container}>
    <Paper className={classes.search}>
      <InputBase
        className={classes.input}
        placeholder="Enter city..."
        inputProps={{ 'aria-label': 'search' }}
        value={searchValue}
        onChange={changeSearchValue}
        onKeyPress={handleKeyPress}
      />
      <IconButton 
        className={classes.iconButton} 
        aria-label="search" 
        onClick={() => handleSearchCity(searchValue)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
    {
      searchResult == null ? null : 
        <CityCard cityInfo={searchResult} />
    }
  </div>
}