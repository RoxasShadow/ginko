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
      Bank.all.map do |bank|
        funds[m].concat Fund.group(:bank_id)
          .where(bank_id: bank.id)
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
    fund_ids = Fund.includes(:bank)
      .group(:bank_id)
      .having('aligned_at = MAX(aligned_at)')
      .select(:id)

    funds = Fund.where(id: fund_ids)
      .group(:amount_currency)
      .sum(:amount_cents)
      .map do |currency, amount|
        amount = Money.new(amount, currency)
          .exchange_to(params[:currency])

        {
          amount: amount.to_f, # `amount` worth of `currency`
          amount_currency: currency
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

    if fund.save
      render json: fund, status: :created, location: fund
    else
      render json: fund.errors, status: :unprocessable_entity
    end
  end

  private

  def fund_params
    params.require(:fund).permit(:aligned_at, :amount_currency, :amount_cents, :bank_id)
  end
end
