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

function fetch(p, o) {
  if(o === undefined) {
    return window.fetch(`http://localhost:4567${p}`);
  }
  else {
    return window.fetch(`http://localhost:4567${p}`, o);
  }
}

export { formatMoney, currencyToSym, fetch };
