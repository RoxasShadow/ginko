import React from 'react';
import $ from 'jquery';
import makeMorris from 'morris-js-module';

import CurrencySelector from './CurrencySelector';
import './CurrencySelector.css';
import { formatMoney } from '../utils';

var Morris = makeMorris($);

class Funds extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: 'EUR'
    };
  }

  componentDidMount() {
    window.funds_donut = null;

    this.drawDonut();
  }

  componentDidUpdate() {
    this.drawDonut();
  }

  drawDonut() {
    fetch(`/funds?currency=${this.state.currency}`).then(response => {
      response.json().then(funds => {
        funds = funds.map(h => {
          return { label: h.bank_name, value: h.amount };
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
