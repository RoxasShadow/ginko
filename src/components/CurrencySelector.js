import React from 'react';
import { Radio } from 'react-bootstrap';

class CurrencySelector extends React.Component {
  render() {
    let currency = this.props.currency;
    let checked  = this.props.parent.state.currency === currency;

    return(
      <Radio
        inline
        checked={checked}
        className={'CurrencySelector btn btn-primary' + (checked ? ' active' : '')}
        onChange={() => this.props.parent.setState({ currency: currency })}
      >
        {currency}
      </Radio>
    );
  }
}

export default CurrencySelector;
