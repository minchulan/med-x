class LikesController < ApplicationController
  before_action :find_post

  def create
    @like = @post.likes.new(user_id: current_user.id)

    if @like.save
        update_likes_count
        render json: { likes_count: @post.likes_count }, status: :created
    else
        render json: @like.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @post.likes.destroy_by(user_id: current_user.id)
        update_likes_count
        head :no_content # Respond with a 204 status code
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  private

  def find_post
    @post = Post.find(params[:post_id])
  end

  def update_likes_count
    @post.update(likes_count: @post.likes.count)
  end
  
end

# likesController is responsible for creating and deleting likes. 



