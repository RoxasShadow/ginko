import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Menu from './components/Menu';
import Trend from './components/Trend';
import Funds from './components/Funds';
import History from './components/History';
import RegisterFunds from './components/RegisterFunds';

const Budget = () => (
  <div>
    <div className="row">
      <div className="col-lg-12">
        <h1 className="page-header">Budget</h1>
      </div>
    </div>

    <div className="row">
      <span>hi</span>
    </div>
  </div>
);

const Dashboard = () => (
  <div>
    <div className="row">
      <div className="col-lg-12">
        <h1 className="page-header">Dashboard</h1>
      </div>
    </div>

    <div className="row">
      <Trend />
    </div>

    <div className="row">
      <Funds />
      <History />
    </div>
  </div>
);

const App = () => (
  <main>
    <Menu />

    <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route path='/budget' component={Budget} />
    </Switch>
  </main>
);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));

ReactDOM.render(<RegisterFunds />, document.getElementById('register-funds'));
