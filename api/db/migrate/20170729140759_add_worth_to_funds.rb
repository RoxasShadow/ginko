class AddWorthToFunds < ActiveRecord::Migration[5.0]
  def change
    # i.e. you buy €2000 worth of BTC, you will add
    # funds for 1BTC with worth=€2000
    add_monetize :funds, :worth
  end
end
