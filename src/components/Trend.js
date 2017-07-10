import React from 'react';
import $ from 'jquery';
import makeMorris from 'morris-js-module';

import CurrencySelector from './CurrencySelector';
import './CurrencySelector.css';
import { formatMoney } from '../utils';

const Morris = makeMorris($);

class Trend extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: 'EUR'
    };
  }

  componentDidMount() {
    window.trend_chart = null;

    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    fetch(`/funds?trend=monthly&currency=${this.state.currency}`).then(response => {
      return response.json().then(history => {
        // this is a clear hack as I'm not able to
        // memoize the chart object to the props
        if(window.trend_chart) {
          window.trend_chart.setData(history);
        } else {
          window.trend_chart = Morris.Line({
            element: 'morris-area-chart',
            data: history,
            xkey: 'aligned_at',
            ykeys: ['amount'],
            labels: ['Funds'],
            pointsize: 2,
            hidehover: 'auto',
            resize: true,
            yLabelFormat: (v) => { return formatMoney(v, this.state.currency); }
          });
        }
      });
    });
  }

  render() {
    return(
      <div className="col-lg-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title pull-left">
              <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"></i> Capital amount</h3>
            </div>

            <div className="panel-title pull-right">
              <div className="btn-group">
                <CurrencySelector parent={this} currency='EUR' />
                <CurrencySelector parent={this} currency='BTC' />
                <CurrencySelector parent={this} currency='ETH' />
              </div>
            </div>

            <div className="clearfix"></div>
          </div>
          <div className="panel-body">
            <div id="morris-area-chart"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Trend;
