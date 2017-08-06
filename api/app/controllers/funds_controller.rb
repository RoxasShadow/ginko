class FundsController < ApplicationController
  # GET /history
  def history
    funds = Fund.includes(:bank).order(aligned_at: :desc)
    render json: funds
  end

  # GET /trend
  def trend
    year  = Date.today.year.to_s
    funds = {}

    # first month in which funds are present
    start_month = Fund.where(amount_currency: params[:currency])
      .where("strftime('%Y', aligned_at) = ?", year)
      .order(aligned_at: :asc)
      .select(:aligned_at)
      .limit(1)

    return render json: [] if start_month.empty?
    start_month = start_month.first.aligned_at.month

    (start_month..Date.today.month).each do |m|
      funds[m] = []

      # for each bank, get the funds to it belonging registered in this year.
      # from these records, get the most recent one in relation to the month
      # that we are now iterating
      Bank.pluck(:id).each do |bank_id|
        funds[m].concat Fund.group(:bank_id)
          .where(bank_id: bank_id)
          .where(amount_currency: params[:currency])
          .where("strftime('%Y', aligned_at) = ?", year)
          .where("CAST(strftime('%m', aligned_at) AS INTEGER) <= ?", m)
          .having('aligned_at = MAX(aligned_at)')
          .pluck(:amount_cents)
      end
    end

    funds = funds.map do |k, v|
      {
        date: "#{year}-#{k}",
        amount: Money.new(v.sum, params[:currency]).to_f
      }
    end

    render json: funds
  end

  # GET /currencies
  def currencies
    query = Fund.group(:amount_currency)
      .having('aligned_at = MAX(aligned_at)')
      .select('amount_currency, amount_cents, worth_cents')

    if params[:currency].present?
      query = query.where(amount_currency: params[:currency])
    end

    results = Bank.pluck(:id).map do |bank_id|
      query.where(bank_id: bank_id)
    end

    results = results.flatten.group_by { |k| k.amount_currency }

    funds = []
    results.each do |currency, records|
      amount = records.sum(&:amount_cents)
      amount = Money.new(amount, currency)

      if params[:to_currency].present?
        begin
          amount = amount.exchange_to(params[:to_currency])
        rescue SocketError => e
          Rails.logger.warn "An error occurred while calling your bank: #{e.message}"
        end
      end

      initial_amount = records.sum(&:worth_cents)
      initial_amount = initial_amount.zero? ? amount : Money.new(initial_amount, 'EUR')

      funds << {
        amount: amount.to_f, # `amount` worth of `currency`
        amount_currency: currency,
        initial_amount: initial_amount.to_f
      }
    end

    render json: funds
  end

  # GET /funds
  def index
    funds = Fund.includes(:bank)
      .where(amount_currency: params[:currency])
      .group(:bank_id)
      .having('aligned_at = MAX(aligned_at)')

    render json: funds
  end

  # POST /funds
  def create
    bank = Bank.find(fund_params[:bank_id])
    fund = bank.funds.new(fund_params.except(:bank_id))

    fund.amount = Money.from_amount(fund_params[:amount_cents], fund_params[:amount_currency]).to_money
    fund.worth  = Money.from_amount(fund_params[:worth_cents], 'EUR').to_money

    if fund.previous.present?
      case params[:mode]
      when 'add'
        fund.amount += fund.previous.amount
        fund.worth  += fund.previous.worth
      when 'sub'
        fund.amount = fund.previous.amount - fund.amount
        fund.worth  = fund.previous.worth  - fund.worth
      end
    end

    if fund.save
      render json: fund, status: :created, location: fund
    else
      render json: fund.errors, status: :unprocessable_entity
    end
  end

  private

  def fund_params
    params.require(:fund).permit(:aligned_at, :amount_currency, :amount_cents, :worth_cents, :bank_id)
  end
end
