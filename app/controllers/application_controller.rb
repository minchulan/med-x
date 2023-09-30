class ApplicationController < ActionController::API
  include ActionController::Cookies

  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end 

  def authorize_user
    render json: { errors: { User: "Not Authorized" } }, status: :unauthorized unless current_user
  end 
end

