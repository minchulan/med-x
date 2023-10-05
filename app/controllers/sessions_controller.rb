class SessionsController < ApplicationController
    skip_before_action :authorize_user, only: [:create]
    before_action :authorize_user, only: [:create]

    # POST '/login' 
    def create 
        user = User.find_by_email(params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id 
            render json: user, status: :ok 
        else  
            render json: { error: "Incorrect Username or Password" }, status: :unauthorized
        end
    end

    # DELETE '/logout'
    def destroy  
        session.delete :user_id
        head :no_content 
    end 
end

#------------------------------------------------------