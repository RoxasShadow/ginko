import React from 'react';
import ReactDOM from 'react-dom';

import CurrencySelector from './components/CurrencySelector';
import './components/CurrencySelector.css';

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

function diff(t) {
  if(t.funds > t.prev_funds) {
    return ` (+ ${formatMoney(t.funds - t.prev_funds, t.currency)})`;
  } else if(t.funds < t.prev_funds) {
    return ` (- ${formatMoney(t.prev_funds - t.funds, t.currency)})`;
  }

  return '';
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

class Funds extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: 'EUR'
    };
  }

  componentDidMount() {
    this.drawDonut();
  }

  componentDidUpdate() {
    this.drawDonut();
  }

  drawDonut() {
    fetch('/funds').then(response => {
      response.json().then(funds => {
        funds = funds[this.state.currency].map(h => {
          return { label: h.bank, value: h.funds };
        });

        // this is a clear hack as I'm not able to
        // memoize the chart object to the props
        if(window.funds_donut) {
          window.funds_donut.setData(funds);
        } else {
          window.funds_donut = Morris.Donut({
            element: 'morris-donut-chart',
            data: funds,
            formatter: (y, data) => {
              return formatMoney(y, this.state.currency);
            },
            resize: true
          });
        }
      });
    });
  }

  render() {
    return(
      <div className="col-lg-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title pull-left">
              <h3 className="panel-title"><i className="fa fa-bank fa-fw"></i> Funds</h3>
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
            <div id="morris-donut-chart"></div>
            <div className="text-right">
              <a href="#">View Details <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class HistoryEntry extends React.Component {
  render() {
    let e = this.props.e;

    return(
      <tr>
        <td>{e.date}</td>
        <td>{e.bank}</td>
        <td>{formatMoney(e.funds, e.currency)}{diff(e)}</td>
      </tr>
    );
  }
}

class History extends React.Component {
  constructor() {
    super();

    this.state = {
      history: []
    };
  }

  componentDidMount() {
    let react = this;

    fetch('/history').then(response => {
      return response.json().then(json => {
        react.setState({ history: json });
      });
    });
  }

  render() {
    return(
      <div className="col-lg-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><i className="fa fa-money fa-fw"></i> History</h3>
          </div>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped history">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Bank</th>
                    <th>Funds (diff)</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.history.map((e, i) => {
                    return(
                      <HistoryEntry key={i} e={e} />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="text-right">
              <a href="#">View All Transactions <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

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

ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));
