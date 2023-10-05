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
        user = User.new(user_params)
        if user.save 
            session[:user_id] = user.id 
            render json: user, status: :ok 
        else  
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end 
    end 

    private 

    def user_params 
        params.require(:user).permit(:username, :email, :password)
    end 

    def find_user 
        @user = current_user
        render_not_found unless @user 
    end 
end