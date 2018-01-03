import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './store';
import { Auth } from './services/Auth';
import {
  Login,
  Regist,
  Dashboard,
  WeatherIndex,
  WeatherEdit,
} from './containers/index';

require('./app.scss');

const history = syncHistoryWithStore(browserHistory, store);

let App = ({ children }) => {
  return (
    <div>
      <Navbar>
        <Nav>
          <IndexLinkContainer to="/weather">
            <NavItem>Dashboard</NavItem>
          </IndexLinkContainer>

        </Nav>
        {Auth.authenticated() && <Nav className="pull-right">
          <NavItem onClick={Auth.logout.bind(this)}>Logout</NavItem>
        </Nav>}
        {!Auth.authenticated() && <Nav className="pull-right">
          <LinkContainer to="/regist">
            <NavItem>Regist</NavItem>
          </LinkContainer>
        </Nav>}
        {!Auth.authenticated() && <Nav className="pull-right">
          <LinkContainer to="/login">
            <NavItem>Login</NavItem>
          </LinkContainer>
        </Nav>}
      </Navbar>
      <div className="container">
        {children}
      </div>
    </div>
  );
}

const requireAuth = (nextState, replace, callback) => {
  const token = localStorage.getItem('token')
  if (token === null) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
  callback();
}

export default () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/login" component={Login} />
        <Route path="/regist" component={Regist} />
        <Route path="/" component={App}>
          <IndexRoute component={Dashboard} />
          <Route path="/weather" onEnter={requireAuth} component={WeatherIndex} />
          <Route path="/weather/new" onEnter={requireAuth} component={WeatherEdit} />
          <Route path="/weather/:weatherId" onEnter={requireAuth} component={WeatherEdit} />
        </Route>
      </Router>
    </Provider>
  )
}
