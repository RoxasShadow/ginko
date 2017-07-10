class FundsController < ApplicationController
  # GET /history
  def history
    funds = Fund.includes(:bank).order(aligned_at: :desc)
    render json: funds
  end

  # GET /funds
  def index
    funds = Fund.includes(:bank)
      .order(aligned_at: :desc)
      .where(amount_currency: params[:currency])

    if params[:trend] == 'monthly'
      # TODO
    end

    render json: funds
  end

  # POST /funds
  def create
    bank = Bank.find(fund_params[:bank_id])
    fund = bank.funds.new(fund_params.except(:bank_id))

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
