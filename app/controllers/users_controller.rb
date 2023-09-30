class UsersController < ApplicationController
    def index  
        render json: User.all
    end  

    def create # post '/signup'
        new_user = User.new(user_params)
        if new_user.save
            session[:user_id] = user.id # auto-login newly created user & sends session cookie to frontend.
            render json: new_user, status: :ok 
        else  
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity 
        end 
    end 

    def show # get '/me'
        render json: @current_user
    end 

    private 

    def user_params 
        params.require(:user).permit(:username, :email, :password)
    end 
end

#------------------------------------------------------