Rails.application.routes.draw do
  resources :users, only: [:index, :show] do
    # PUT "/users/:id/update_image"
    member do
      put 'update_image'
    end
  end

  resources :posts do
    resources :comments, shallow: true
    resources :likes, only: [:create, :destroy]
  end

  patch "/posts/:post_id/comments/:id", to: "comments#update"
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



  ## MEMBER
    #  Member routes are routes that act on an individual member of the collection (in this case, a specific user). The put 'update_image' line creates a custom update_image route that can be accessed via a PUT request on a specific user's URL, like /users/:id/update_image.

  ## PUT Request: 
    #Purpose: The PUT request is used to update or create a resource at a specific URL.

    #Idempotent: PUT requests are idempotent, meaning that making the same request multiple times will have the same effect as making it once. If you send a PUT request to a resource URL, it will replace the resource or create it if it doesn't exist.

    #Full Update: When you send a PUT request, you typically send the entire updated resource to the server. This means if you have a user resource and you send a PUT request to update the user, you 


  ## SHALLOW
    # shallow: true gives us the following routes:
      # resources :comments, only: [:index, :create] <--nested
      # resources :comments, only: [:show, :update, :destroy] <-- non-nested