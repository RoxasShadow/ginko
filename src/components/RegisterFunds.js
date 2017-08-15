import React from 'react';
import moment from 'moment';
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

import './RegisterFunds.css';
import { currencyToSym, fetch } from '../utils';

class RegisterFunds extends React.Component {
  constructor() {
    super();

    this.state = {
      startDate: moment(),
      precision: 2,
      amount: 0.00,
      worth: 0.00,
      currency: 'EUR',
      bank: '',
      banks: []
    };

    this.handleDateChange     = this.handleDateChange.bind(this);
    this.handleAmountChange   = this.handleAmountChange.bind(this);
    this.handleWorthChange    = this.handleWorthChange.bind(this);
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

  handleAmountChange(event, maskedValue, floatValue) {
    this.setState({
      amount: floatValue,
    });
  }

  handleWorthChange(event, maskedValue, floatValue) {
    this.setState({
      worth: floatValue,
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
        'bank_id': this.state.bank || document.getElementsByClassName('bankSelector')[0].value,
        'aligned_at': this.state.startDate,
        'amount_currency': this.state.currency,
        'amount_cents': this.state.amount,
        'worth_cents': this.state.worth
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

    const mode = document.getElementsByClassName('active')[0].children[0].value;
    fetch(`/funds?mode=${mode}`, opts).then(response => {
      window.location.reload(false);
    });
  }

  render() {
    return(
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup>
          <InputGroup className="startDate">
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
              {window.all_currencies.map(currency => (<option key={currency} value={currency}>{currency}</option>))}
            </FormControl>
          </InputGroup>
          {' '}
          <InputGroup>
            <InputGroup.Addon><b>{currencyToSym(this.state.currency)}</b></InputGroup.Addon>
            <CurrencyInput decimalSeparator=',' thousandSeparator='.' precision={this.state.precision} value={this.state.amount} onChangeEvent={this.handleAmountChange} className='form-control' />
          </InputGroup>
          {' '}
          {this.state.currency !== 'EUR' && (
            <InputGroup title='Worth of'>
              <InputGroup.Addon><b>{currencyToSym('EUR')}</b></InputGroup.Addon>
              <CurrencyInput decimalSeparator=',' thousandSeparator='.' precision={2} value={this.state.worth} onChangeEvent={this.handleWorthChange} className='form-control' />
            </InputGroup>
          )}
          {' '}
          <div className="btn-group" data-toggle="buttons">
            <label className="btn btn-primary">
              <input type="radio" name="options" value="sub" />Sub
            </label>

            <label className="btn btn-primary active">
              <input type="radio" name="options" value="set" defaultChecked />Set
            </label>

            <label className="btn btn-primary">
              <input type="radio" name="options" value="add" />Add
            </label>
          </div>
        </FormGroup>
        {' '}
        <Button type="submit">Register funds</Button>
      </Form>
    );
  }
}

export default RegisterFunds;
