class FundSerializer < ActiveModel::Serializer
  attributes :bank_name, :aligned_at, :amount, :amount_eur, :amount_currency,
    :previous_amount, :previous_amount_eur, :worth

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
    @_previous_amount ||= object.previous.amount.to_f if object.previous
  end

  def previous_amount_eur
    return if object.amount_currency == 'EUR'
    return unless object.previous

    begin
      object.previous.amount.exchange_to('EUR').to_f
    rescue SocketError => e
      Rails.logger.warn "An error occurred while calling your bank: #{e.message}"
    end
  end

  def worth
    object.worth.to_f unless object.worth.zero?
  end
end
