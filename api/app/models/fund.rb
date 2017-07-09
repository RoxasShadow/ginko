class Fund < ApplicationRecord
  belongs_to :bank, counter_cache: true

  monetize :amount_cents, with_model_currency: :amount_currency

  accepts_nested_attributes_for :bank
end
