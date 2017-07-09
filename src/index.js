import React from 'react';
import ReactDOM from 'react-dom';

import Trend from './components/Trend';
import Funds from './components/Funds';
import History from './components/History';
import RegisterFunds from './components/RegisterFunds';

class Dashboard extends React.Component {
  render() {
    return(
      <div>
        <div className="row">
          <Trend />
        </div>

        <div className="row">
          <Funds />
          <History />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
ReactDOM.render(<RegisterFunds />, document.getElementById('register-funds'));
