Rails.application.routes.draw do
  resources :funds
  resources :banks

  get '/history', to: 'funds#history', as: 'history'
end
