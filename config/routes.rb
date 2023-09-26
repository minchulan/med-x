Rails.application.routes.draw do

  resources :comments
  resources :users
  # posts/:post_id/comments 
  resources :posts do 
    resources :comments, shallow: true 
  end 

  #signup
  get "/signup", to: "users#create"
  #login
  get "/login", to: "sessions#create"
  #logout
  get "/logout", to: "sessions#destroy"

  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
