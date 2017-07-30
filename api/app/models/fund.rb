class Fund < ApplicationRecord
  belongs_to :bank, counter_cache: true

  monetize :amount_cents, with_model_currency: :amount_currency
  monetize :worth_cents,  with_model_currency: :worth_currency

  accepts_nested_attributes_for :bank

  def previous
    return @_previous if @_previous

    funds = persisted? ? Fund.where.not(id: id) : Fund

    @_previous = funds
      .where(bank_id: bank_id)
      .where(amount_currency: amount_currency)
      .where('aligned_at < ?', aligned_at)
      .order(aligned_at: :asc)
      .last
  end
end
