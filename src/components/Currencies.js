import React from 'react';
import $ from 'jquery';
import makeMorris from 'morris-js-module';

import { formatMoney } from '../utils';

var Morris = makeMorris($);

class Currencies extends React.Component {
  constructor() {
    super();

    fetch('/currencies?currency=EUR').then(response => {
      response.json().then(funds => {
        funds = funds.map(h => {
          return { label: h.amount_currency, value: h.amount };
        });

        Morris.Donut({
          element: 'morris-donut-chart-ws',
          data: funds,
          formatter: (y, data) => {
            return formatMoney(y, data.label);
          },
          resize: true
        });
      });
    });
  }

  render() {
    return(
      <div className="col-lg-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title pull-left">
              <h3 className="panel-title"><i className="fa fa-money fa-fw"></i> Currencies</h3>
            </div>

            <div className="clearfix"></div>
          </div>
          <div className="panel-body">
            <div id="morris-donut-chart-ws"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Currencies;
