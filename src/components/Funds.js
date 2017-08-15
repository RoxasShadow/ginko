import React from 'react';

import CurrencySelector from './CurrencySelector';
import './CurrencySelector.css';
import { formatMoney, fetch } from '../utils';

class Funds extends React.Component {
  componentDidMount() {
    window.funds_donut = null;

    this.draw('EUR');
  }

  draw(currency) {
    this.currency = currency;

    fetch(`/funds?currency=${this.currency}`).then(response => {
      response.json().then(funds => {
        funds = funds.filter((h) => {
          return h.amount > 0.0;
        }).map(h => {
          return { label: h.bank_name, value: h.amount };
        });

        // this is a clear hack as I'm not able to
        // memoize the chart object to the props
        if(window.funds_donut) {
          window.funds_donut.setData(funds);
        } else {
          window.funds_donut = window.Morris.Donut({
            element: 'morris-donut-chart',
            data: funds,
            formatter: (v) => { return formatMoney(v, this.currency); },
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
                <CurrencySelector
                  parent={this}
                  currencies={window.currencies} />
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
