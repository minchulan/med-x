Rails.application.routes.draw do
  resources :comments
  resources :users, only: [:index]
  resources :posts, except: [:show]

  get "/users/:user_id/posts", to: "posts#index"

  # signup
  post "/signup", to: "users#create"

  # login
  post "/login", to: "sessions#create"

  # logout
  delete "/logout", to: "sessions#destroy"

  # me 
  get "/me", to: "users#show"

  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
