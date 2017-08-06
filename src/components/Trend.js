import React from 'react';
import CurrencySelector from './CurrencySelector';
import './CurrencySelector.css';
import { formatMoney, fetch } from '../utils';

class Trend extends React.Component {
  componentDidMount() {
    window.trend_chart = null;

    this.draw('BTC');
  }

  draw(currency) {
    fetch(`/trend?currency=${currency}`).then(response => {
      return response.json().then(trend => {
        // this is a clear hack as I'm not able to
        // memoize the chart object to the props
        if(window.trend_chart) {
          window.trend_chart.setData(trend);
        } else {
          window.trend_chart = window.Morris.Line({
            element: 'morris-area-chart',
            data: trend,
            xkey: 'date',
            ykeys: ['amount'],
            labels: ['Funds'],
            pointsize: 2,
            hidehover: 'auto',
            resize: true,
            yLabelFormat: (v) => { return formatMoney(v, currency); }
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
                <CurrencySelector
                  parent={this}
                  currencies={['EUR', 'BTC', 'ETH']} />
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
