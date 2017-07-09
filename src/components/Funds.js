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
          </div>
        </div>
      </div>
    );
  }
}

export default Funds;
