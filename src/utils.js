export function formatMoney(v, c) {
  let precision = c === 'EUR' ? 2 : 8;

  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: c,
    minimumFractionDigits: precision
  }).format(v);
}

export function diff(t) {
  if(t.previous_amount === null || t.amount === t.previous_amount) {
    return '';
  } else if(t.amount > t.previous_amount) {
    return ` (+${formatMoney(t.amount - t.previous_amount, t.amount_currency)})`;
  } else if(t.amount < t.previous_amount) {
    return ` (-${formatMoney(t.previous_amount - t.amount, t.amount_currency)})`;
  }
}

export function currencyToSym(currency) {
  if(currency === 'EUR') {
    return '€';
  } else if(currency === 'BTC') {
    return '₿';
  } else if(currency === 'ETH') {
    return 'Ξ';
  }
}
