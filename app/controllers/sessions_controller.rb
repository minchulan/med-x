class SessionsController < ApplicationController
    # login 
    def create 
        user = User.find_by_email(params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id 
            render json: user, status: :ok 
        else  
            render json: { errors: "Incorrect Username or Password" }, status: :unauthorized 
    end 
end
