# Controller logic: fallback requests for React Router.
# Leave this here to help deploy your app later! Solely for handling client-side routes 
class FallbackController < ActionController::Base

  def index
    # React app index page
    render file: 'public/index.html'
  end
end
