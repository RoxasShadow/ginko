function formatMoney(v, c) {
  const precision = c === 'EUR' ? 2 : 8;

  const symbol = currencyToSym(c);
  const money = new Intl.NumberFormat('it-IT', {
    style: 'decimal',
    minimumFractionDigits: precision
  }).format(v);

  return `${symbol} ${money}`;
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

function fetch(p) {
  return window.fetch(`http://localhost:4567${p}`);
}

export { formatMoney, currencyToSym, fetch };
