import React from 'react';
import moment from 'moment';

import { diffAmounts, formatMoney, currencyToSym, fetch } from '../utils';

class HistoryEntry extends React.Component {
  render() {
    const e = this.props.e;
    const date = moment(e.aligned_at);

    let diff = diffAmounts(e.previous_amount, e.amount, e.amount_currency);
    if(diff !== '') {
      diff = (
        <span title={diffAmounts(e.previous_amount_eur, e.amount_eur, 'EUR')}>
          ({diff})
        </span>
      );
    }

    const paid = e.worth ? (
      <span title={' (' + formatMoney(e.worth / e.amount, 'EUR') + '/' + currencyToSym(e.amount_currency) + ')'}>
        {'  –> paid ' + formatMoney(e.worth, 'EUR')}
      </span>
    ) : null;

    return(
      <tr>
        <td>{date.format('DD/MM/YY, H:mm')} ({date.fromNow()})</td>
        <td>{e.bank_name}</td>
        <td>
          <span title={formatMoney(e.amount_eur, 'EUR')}>
            {formatMoney(e.amount, e.amount_currency)} {diff}
          </span>
          {paid}
        </td>
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
    fetch('/history').then(response => {
      return response.json().then(funds => {
        this.setState({ funds: funds });
      });
    });
  }

  render() {
    return(
      <div className="col-lg-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><i className="fa fa-clock-o fa-fw"></i> History</h3>
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
          </div>
        </div>
      </div>
    )
  }
}

export default History;
