class ApplicationController < ActionController::API
  around_filter :update_rates

  def update_rates
    begin
      yield
    rescue Money::Bank::UnknownRate
      Money.default_bank.update_rates
    end
  end
end
