class BanksController < ApplicationController
  # GET /banks
  def index
    render json: Bank.order(funds_count: :desc)
  end
end
