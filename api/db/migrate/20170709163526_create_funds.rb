class CreateFunds < ActiveRecord::Migration[5.0]
  def change
    create_table :funds do |t|
      t.references :bank, null: false
      t.datetime   :aligned_at, index: true, null: false
      t.monetize   :amount

      t.timestamps
    end

    change_column :funds, :amount_cents, :decimal
  end
end
