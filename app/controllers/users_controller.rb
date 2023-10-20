class UsersController < ApplicationController
  skip_before_action :authorize_user, only: [:create]
  
  # GET "/users"
  def index
    users = User.all.with_attached_image
    render json: users
  end

  # GET "/me"
  def show
    render json: current_user, status: :ok
  end

  # POST "/signup"
  def create
    new_user = User.new(user_params)
    if new_user.save
      session[:user_id] = new_user.id
      render json: new_user, status: :created
    else
      render json: { errors: new_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT "/me/update_image"
  def update_image
    if current_user.update(image: params[:image])
      render json: { image: url_for(current_user.image) }
    else
      render json: { error: "Failed to update profile picture" }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :email, :password, :password_confirmation, :image)
  end
end
