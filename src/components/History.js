import React from 'react';

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

export default History;
