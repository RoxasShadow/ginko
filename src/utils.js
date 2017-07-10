function formatMoney(v, c) {
  let precision = c === 'EUR' ? 2 : 8;

  let symbol = currencyToSym(c);
  let money = new Intl.NumberFormat('it-IT', {
    style: 'decimal',
    minimumFractionDigits: precision
  }).format(v);

  return `${symbol} ${money}`;
}

function diff(t) {
  if(t.previous_amount === null || t.amount === t.previous_amount) {
    return '';
  } else if(t.amount > t.previous_amount) {
    return ` (+ ${formatMoney(t.amount - t.previous_amount, t.amount_currency)})`;
  } else if(t.amount < t.previous_amount) {
    return ` (- ${formatMoney(t.previous_amount - t.amount, t.amount_currency)})`;
  }
}

function currencyToSym(currency) {
  if(currency === 'EUR') {
    return '€';
  } else if(currency === 'BTC') {
    return '₿';
  } else if(currency === 'ETH') {
    return 'Ξ';
  }
}

export { formatMoney, diff, currencyToSym };
