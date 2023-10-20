Rails.application.routes.draw do
  resources :users, only: [:index, :show]

  resources :posts do
    resources :comments, shallow: true
    resources :likes, only: [:create, :destroy]
  end

  patch "/posts/:post_id/comments/:id", to: "comments#update"
  
  get "/users/:user_id/posts", to: "posts#index"

  # Update profile picture of the authenticated user
  put "/me/update_image", to: "users#update_image"

  # Update bio of the authenticated user 
  put "/me/update_bio", to: "users#update_bio"

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


## resources :users, only: [:index, :show] sets up RESTful routes for the User model with only :index and :show actions available. This means you can list all users (GET /users) and view an individual user (GET /users/:id).

## put 'update_image', on: :collection creates a custom route named update_image accessible via a PUT request.

## put 'update_image': This defines a route named update_image accessible via the PUT HTTP method. It maps to the update_image action in the UsersController.

## on: :collection: This specifies that the update_image route is a collection route, not a member route. In the context of a users resource, a collection route operates on the entire collection of users rather than a specific user. Does not include an `:id` parameter in the URL. 
    # I.e., "/users/image_update"


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