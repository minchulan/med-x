class UsersController < ApplicationController
    
    def index  
        render json: User.all
    end  

    def show # get '/me'
        render json: @current_user
    end 

    def create # post '/signup'
        new_user = User.create(user_params)
        if user.valid? 
            render json: new_user, status: :ok 
        else  
            render json: { errors: errors.full_messages }
        end 
    end 

    private 

    def user_params 
        params.require(:user).permit(:username, :email, :password)
    end 
end
