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
        new_user = User.create!(user_params)
        render json: new_user, status: :ok 
    end

    private 

    def user_params 
        params.permit(:username, :email, :password).tap do |user_params|
            user_params[:email].strip! if user_params[:email].present?
        end
    end


    def find_user 
        @user = current_user
        render_not_found unless @user 
    end 
end