class FundSerializer < ActiveModel::Serializer
  attributes :bank_name, :aligned_at, :amount, :amount_eur, :amount_currency, :previous_amount, :previous_amount_eur

  def aligned_at
    object.aligned_at.strftime('%FT%T%:z')
  end

  def bank_name
    object.bank.name
  end

  def amount
    object.amount.to_f
  end

  def amount_eur
    return if object.amount_currency == 'EUR'

    begin
      object.amount.exchange_to('EUR').to_f
    rescue SocketError => e
      Rails.logger.warn "An error occurred while calling your bank: #{e.message}"
    end
  end

  def previous_amount
    return @_previous_amount if @_previous_amount

    fund = Fund.where('bank_id = ? AND amount_currency = ? AND aligned_at < ? AND id != ?',
                      object.bank_id, object.amount_currency, object.aligned_at, object.id)
      .order(aligned_at: :asc)
      .last

    if fund
      @_previous_amount = fund.amount.to_f
    end
  end

  def previous_amount_eur
    return if object.amount_currency == 'EUR'
    return unless previous_amount

    begin
      Money.from_amount(previous_amount, object.amount_currency).exchange_to('EUR').to_f
    rescue SocketError => e
      Rails.logger.warn "An error occurred while calling your bank: #{e.message}"
    end
  end
end
