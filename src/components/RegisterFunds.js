import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import {
  Form,
  FormGroup,
  FormControl,
  InputGroup,
  Button
} from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { currencyToSym } from '../utils';

class RegisterFunds extends React.Component {
  constructor() {
    super();

    this.state = {
      startDate: moment(),
      precision: 2,
      amount: 0.00,
      currency: 'EUR',
      bank: '',
      banks: []
    };

    this.handleDateChange     = this.handleDateChange.bind(this);
    this.handleFundsChange    = this.handleFundsChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleBankChange     = this.handleBankChange.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/banks').then(response => {
      return response.json().then(banks => {
        this.setState({ banks: banks });
      });
    });
  }

  handleFundsChange(event, maskedValue, floatValue) {
    this.setState({
      amount: floatValue
    });
  }

  handleBankChange(e) {
    this.setState({
      bank: e.target.value
    });
  }

  handleCurrencyChange(e) {
    const currency = e.target.value;

    this.setState({
      currency: currency,
      precision: currency === 'EUR' ? 2 : 8
    });
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const payload = {
      fund: {
        'bank_id': this.state.bank || $('.bankSelector').val(),
        'aligned_at': this.state.startDate,
        'amount_currency': this.state.currency,
        'amount_cents': this.state.amount
      }
    };

    const opts = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    fetch('/funds', opts).then(response => {
      window.location.reload(false);
    });
  }

  render() {
    return(
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><i className="fa fa-calendar"></i></InputGroup.Addon>
            <DatePicker dateFormat='DD/MM/YYYY' maxDate={moment()} selected={this.state.startDate} onChange={this.handleDateChange} className='form-control' />
          </InputGroup>
        </FormGroup>
        {' '}
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><i className="fa fa-bank"></i></InputGroup.Addon>
            <FormControl className="bankSelector" componentClass="select" placeholder="select" onChange={this.handleBankChange}>
              {this.state.banks.map(bank => (<option value={bank.id} key={bank.id}>{bank.name}</option>))}
            </FormControl>
          </InputGroup>
        </FormGroup>
        {' '}
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><i className="fa fa-money"></i></InputGroup.Addon>
            <FormControl componentClass="select" placeholder="select" onChange={this.handleCurrencyChange}>
              <option value="EUR">EUR</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </FormControl>
          </InputGroup>
          {' '}
          <InputGroup>
            <InputGroup.Addon><b>{currencyToSym(this.state.currency)}</b></InputGroup.Addon>
            <CurrencyInput decimalSeparator=',' thousandSeparator='.' precision={this.state.precision} value={this.state.amount} onChangeEvent={this.handleFundsChange} className='form-control' />
          </InputGroup>
        </FormGroup>
        {' '}
        <Button type="submit">Register funds</Button>
      </Form>
    );
  }
}

export default RegisterFunds;
