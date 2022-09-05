import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import {
  createStyles, 
  Theme, 
  makeStyles,
  CssBaseline,
  Container,
  AppBar,
  MenuList,
  MenuItem
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home'
import StarIcon from '@material-ui/icons/Star'

import { HomePage, FavoritesPage, CityPage } from './pages';

const appBarHeight = 64

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#ffffff',
      height: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: `${appBarHeight + theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    navigationList: {
      height: appBarHeight,
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'rgba(28,77,121,1)'
    }
  }),
);

function App() {
  const classes = useStyles();

  return <div className={classes.root}>
    <CssBaseline />
    <AppBar position="fixed">
      <MenuList className={classes.navigationList}>
        <MenuItem 
          component={Link}
          to={'/home'}
        >
          <HomeIcon />
        </MenuItem>
        <MenuItem 
          component={Link}
          to={'/favorites'}
        >
          <StarIcon />
        </MenuItem>
      </MenuList>
    </AppBar>
    <Container className={classes.content} maxWidth={'md'}>
      <Switch> 
        <Route exact path='/'><Redirect to='/home'/></Route>
        <Route exact path='/home' component={HomePage}/>
        <Route exact path='/favorites' component={FavoritesPage}/>
        <Route exact path='/city/:id' component={CityPage}/>
      </Switch>
    </Container>
  </div>
}

export default App;
