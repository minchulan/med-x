class UsersController < ApplicationController
  
  # GET "/users"
  def index  
    render json: User.all
  end  

  # POST "/signup"
  def create 
    new_user = User.new(user_params)
    if new_user.save
      session[:user_id] = new_user.id # auto-login newly created user & send session cookie to frontend.
      render json: new_user, status: :ok 
    else  
      render json: { errors: new_user.errors.full_messages }, status: :unprocessable_entity 
    end 
  end 
 
  # GET "/me"
  def show 
    if @current_user
      render json: @current_user
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end 

  private 

  def user_params 
    params.require(:user).permit(:username, :email, :password)
  end 
end