import React from 'react';
import { Radio } from 'react-bootstrap';

class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: this.props.currencies[0]
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.currency !== nextState.currency;
  }

  componentDidUpdate() {
    this.props.parent.draw(this.state.currency);
  }

  render() {
    return(
      <div>
        {this.props.currencies.map(currency => {
          const checked = currency === this.state.currency;

          return(
            <Radio
              inline
              checked={checked}
              className={'CurrencySelector btn btn-primary' + (checked ? ' active' : '')}
              onChange={() => this.setState({ currency: currency })}
              key={currency}
            >
              {currency}
            </Radio>
          );
        })}
      </div>
    );
  }
}

export default CurrencySelector;
