Bank.create!([
  {name: "CryptoWallet", funds_count: 1},
  {name: "UniCredit", funds_count: 1},
  {name: "MasterCard", funds_count: 1},
  {name: "Kraken", funds_count: 2},
  {name: "Coinbase", funds_count: 1},
])
Fund.create!([
  {bank_id: 1, aligned_at: "2017-06-10 14:37:16", amount_cents: "1281567.0", amount_currency: "BTC", worth_cents: "2979"},
  {bank_id: 2, aligned_at: "2017-06-14 14:37:25", amount_cents: "1843314.0", amount_currency: "EUR"},
  {bank_id: 3, aligned_at: "2017-06-24 14:40:27", amount_cents: "45372.0", amount_currency: "EUR"},
  {bank_id: 4, aligned_at: "2017-06-24 14:40:45", amount_cents: "138220.0", amount_currency: "EUR"},
  {bank_id: 4, aligned_at: "2017-07-24 14:42:50", amount_cents: "39500000.0", amount_currency: "BTC", worth_cents: "91826"},
  {bank_id: 5, aligned_at: "2017-07-24 14:44:10", amount_cents: "58.301408", amount_currency: "ETH", worth_cents: "10007"},
  {bank_id: 5, aligned_at: "2017-07-30 10:00:00", amount_cents: "60.000000", amount_currency: "ETH", worth_cents: "12080"},
])
