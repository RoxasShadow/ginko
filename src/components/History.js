import React from 'react';
import moment from 'moment';

import { formatMoney, diff } from '../utils';

class HistoryEntry extends React.Component {
  render() {
    let e = this.props.e;
    let date = moment(e.aligned_at);

    return(
      <tr>
        <td>{date.format('DD/MM/YY, H:mm')} ({date.fromNow()})</td>
        <td>{e.bank_name}</td>
        <td>{formatMoney(e.amount, e.amount_currency)}{diff(e)}</td>
      </tr>
    );
  }
}

class History extends React.Component {
  constructor() {
    super();

    this.state = {
      funds: []
    };
  }

  componentDidMount() {
    let react = this;

    fetch('/funds').then(response => {
      return response.json().then(funds => {
        react.setState({ funds: funds });
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
                  {this.state.funds.map((e, i) => {
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

export default History;
