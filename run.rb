require 'sinatra'
require 'json'

get '/funds' do
  content_type :json

  {
    'EUR' => [
      { bank: 'UniCredit', funds: 2929.99 },
      { bank: 'N26', funds: 4949.49 },
      { bank: 'GeniusCard', funds: 557.72 },
      { bank: 'Lottomaticard', funds: 51.38 },
      { bank: 'Kraken', funds: 1500 }
    ],
    'BTC' => [
      { bank: 'Coinbase', funds: 21.49 },
    ],
    'ETH' =>[
      { bank: 'Coinbase', funds: 2.09 }
    ]
  }.to_json
end

get '/history' do
  content_type :json

  [
    { date: '2012-02-24 15:00:00', bank: 'UniCredit', funds: 8929.99, prev_funds: 2929.99, currency: 'EUR' },
    { date: '2012-03-12 20:20:50', bank: 'UniCredit', funds: 190.14,  prev_funds: 8929.99, currency: 'EUR' }
  ].to_json
end

get '/trend' do
  content_type :json

  [
    { date: '2017-01', currencies: { 'EUR' => 2929.99, 'BTC' => 1000.10 } },
    { date: '2017-02', currencies: { 'EUR' => 8929.99, 'BTC' => 1000.10 } },
    { date: '2017-03', currencies: { 'EUR' => 190.14,  'BTC' => 500.10 } }
  ].to_json
end
