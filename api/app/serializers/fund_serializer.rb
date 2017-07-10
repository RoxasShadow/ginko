class FundSerializer < ActiveModel::Serializer
  attributes :bank_name, :aligned_at, :amount, :amount_currency, :previous_amount

  def aligned_at
    object.aligned_at.strftime('%FT%T%:z')
  end

  def bank_name
    object.bank.name
  end

  def amount
    object.amount.to_f
  end

  def previous_amount
    fund = Fund.where('bank_id = ? AND amount_currency = ? AND aligned_at < ? AND id != ?',
                      object.bank_id, object.amount_currency, object.aligned_at, object.id)
      .order(aligned_at: :asc)
      .last
    fund.amount.to_f if fund
  end
end
