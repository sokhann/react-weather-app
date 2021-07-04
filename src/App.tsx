import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  createStyles, 
  Theme, 
  makeStyles,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Drawer
} from '@material-ui/core';

import { Menu, MenuLinkProps } from './components/Menu'
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage'
import { CityPage } from './pages/CityPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: 64
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: 64
    },
  }),
);

const menu: MenuLinkProps[] = [
  {
    title: 'Home',
    link: '/home'
  },
  {
    title: 'Favorites',
    link: '/favorites'
  }
];

function App() {
  const classes = useStyles();

  return <div className={classes.root}>
    <CssBaseline />
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Weather App
        </Typography>
      </Toolbar>
    </AppBar>
    
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
    >
      <Menu links={menu} />
    </Drawer> 

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
