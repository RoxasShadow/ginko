import React from 'react';

import CurrencySelector from './CurrencySelector';
import './CurrencySelector.css';

import $ from 'jquery';
import makeMorris from 'morris-js-module';
var Morris = makeMorris($);

function formatMoney(v, c) {
  let browserLang = navigator.language || navigator.userLanguage;

  return new Intl.NumberFormat(browserLang, {
    style: 'currency',
    currency: c,
    minimumFractionDigits: 2
  }).format(v);
}

class Trend extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: 'EUR'
    };
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    fetch('/trend').then(response => {
      return response.json().then(history => {
        history.forEach((e) => {
          e.funds = e.currencies[this.state.currency];
        });

        // this is a clear hack as I'm not able to
        // memoize the chart object to the props
        if(window.trend_chart) {
          window.trend_chart.setData(history);
        } else {
          window.trend_chart = Morris.Area({
            element: 'morris-area-chart',
            data: history,
            xkey: 'date',
            ykeys: ['funds'],
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
              <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"></i> Trend</h3>
            </div>

            <div className="panel-title pull-right">
              <div className="btn-group">
                <CurrencySelector parent={this} currency='EUR' />
                <CurrencySelector parent={this} currency='BTC' />
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
