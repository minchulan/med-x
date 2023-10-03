class UsersController < ApplicationController
    before_action :find_user, only: [:show, :update, :destroy]
    skip_before_action :authorize_user, only: [:create]
  
    # GET "/users"
    def index  
        render json: User.all
    end  

    # GET "/me"
    def show 
        render json: @user, status: :ok 
    end 

    # POST "/signup"
    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :ok 
    end 
    # creating a user, and side-effect is logging in. 

    private 

    def user_params 
        params.require(:user).permit(:username, :email, :password)
    end 

    def find_user 
        @user = current_user
        render_not_found unless @user 
    end 
end