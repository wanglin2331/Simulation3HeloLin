import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './component/Login'
import Dashboard from './component/Dashboard'


class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
        <Route component={Login} path='/' exact />
        <Route component={Dashboard} path='/dashboard' />
      </Switch>
    </Router>
    );
  }
}

export default App;
