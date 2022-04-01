import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainNavigation from './components/Shared/components/Navigation/MainNavigation';
import Footer from './components/Shared/components/Footer/Footer';
import LoginPage from './components/User/pages/Login';
import SignupPage from './components/User/pages/Signup';
import PlayerSearchPage from './components/Services/pages/PlayerSearch';
import ComparePlayersPage from './components/Services/pages/CompareSearch';
import HomePage from './components/Services/pages/homePage';
import PlayerSearchResultPage from './components/Services/pages/PlayerSearchResult';
import MatchSearchResultPage from './components/Services/pages/MatchSearchResult';
import CompareResultPage from './components/Services/pages/CompareResult';
import ProfilePage from './components/Services/pages/SignedUserProfile.js';

import './App.css';

function App() {
  /* isAuth will determine which routes we will expose to the user */
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  /* routes will save the correct routes to display */
  let routes;
  if (!isAuth) {
    /* The view for unregistered user */
    routes = (
      <Switch>
        <Route path="/Login" exact>
          <LoginPage />
        </Route>
        <Route path="/Signup" exact>
          <SignupPage />
        </Route>
        <Route path="/Player-Search" exact>
          <PlayerSearchPage />
        </Route>
        <Route path="/Compare-Search" exact>
          <ComparePlayersPage />
        </Route>
        <Route path="/playerSearch/:username/:platform" exact>
          <PlayerSearchResultPage />
        </Route>
        <Route path="/matchSearch/:matchID/" exact>
          <MatchSearchResultPage />
        </Route>
        <Route path="/playersCompare/:players/" exact>
          <CompareResultPage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
    return (
      <React.Fragment>
        <MainNavigation />
        <main>{routes}</main>
        <Footer />
      </React.Fragment>
    );
  }
  else {
    /* The view for registered user */
    routes = (
      <Switch>
        <Route path="/Player-Search" exact>
          <PlayerSearchPage />
        </Route>
        <Route path="/Compare-Search" exact>
          <ComparePlayersPage />
        </Route>
        <Route path="/playerSearch/:username/:platform" exact>
          <PlayerSearchResultPage />
        </Route>
        <Route path="/matchSearch/:matchID/" exact>
          <MatchSearchResultPage />
        </Route>
        <Route path="/playersCompare/:players/" exact>
          <CompareResultPage />
        </Route>
        <Route path="/Player-Profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
    return (
      <React.Fragment>
        <MainNavigation />
        <main>{routes}</main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
