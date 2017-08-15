function  diffAmounts(previousAmount, amount, currency) {
  if(previousAmount === null || amount === previousAmount) {
    return '';
  }

  const render = function(symbol, diff, currency) {
    return `${symbol} ${formatMoney(diff, currency)}`;
  };

  if(amount > previousAmount) {
    const diff = amount - previousAmount;
    return render('+', diff, currency);
  } else if(amount < previousAmount) {
    const diff = previousAmount - amount;
    return render('-', diff, currency);
  }
}

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

  return currency;
}

function fetch(p, o) {
  if(o === undefined) {
    return window.fetch(`http://localhost:4567${p}`);
  }
  else {
    return window.fetch(`http://localhost:4567${p}`, o);
  }
}

function syncFetch(p) {
  let request = new XMLHttpRequest();
  request.open('GET', `http://localhost:4567${p}`, false);
  request.send(null);

  return JSON.parse(request.responseText);
}

export { diffAmounts, formatMoney, currencyToSym, fetch, syncFetch };
