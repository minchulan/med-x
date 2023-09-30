Rails.application.routes.draw do

  resources :users, only: [:index]
  
  resources :posts do 
    resources :comments, shallow: true 
  end 

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


#------------------------------------------------------
# get "/users/:user_id/posts", to: "posts#index"

# shallow: true gives us the following routes:
    # resources :comments, only: [:index, :create] <--nested
    # resources :comments, only: [:show, :update, :destroy] <-- non-nested