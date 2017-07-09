class CreateBanks < ActiveRecord::Migration[5.0]
  def change
    create_table :banks do |t|
      t.string :name, null: false
      t.integer :funds_count, default: 0

      t.timestamps
    end

    add_index :banks, :name, unique: true
  end
end
