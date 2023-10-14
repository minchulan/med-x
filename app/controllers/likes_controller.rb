class LikesController < ApplicationController
  before_action :find_post
  before_action :find_like, only: [:destroy]

  def create
    @like = @post.likes.new(user_id: current_user.id)

    if @like.save
      render json: @like, status: :created
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @like.destroy
      head :no_content # Respond with a 204 status code
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  private

  def find_post
    @post = Post.find(params[:post_id])
  end

  def find_like
    @like = @post.likes.find_by(user_id: current_user.id)
    render json: { error: 'Like not found' }, status: :not_found unless @like
  end
  
end
