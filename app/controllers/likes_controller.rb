class LikesController < ApplicationController
  before_action :find_post

  def create
    @like = @post.likes.new(user_id: current_user.id)

    if @like.save
      render json: { likes_count: @post.likes_count }, status: :created
    else
      render json: { error: @like.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def destroy
    @like = @post.likes.find_by(user_id: current_user.id)

    if @like&.destroy
      render json: { likes_count: @post.likes_count }, status: :ok
    else
      render json: { error: "Like not found or failed to unlike the post" }, status: :unprocessable_entity
    end
  end

  private

  def find_post
    @post = Post.find(params[:post_id])
  end
end


## Counter Cache 
    ## `counter_cache`
        # Results in fewer request to DB and better performance. It’s just a database column storing the number of children, with the value automatically updated. 
        # PRO: The benefit is that the application almost never needs to query the child database table for the count of children.
        # Whenever any code in a Rails application changes the number of children of a parent model, the value of the counter_cache column is automatically updated. 

    ## Definition 
        # For any parent model with an associated child model, the counter_cache is an integer database column with the value maintained by the Rails framework. An application should treat it as read-only. The column contains a pre-calculated number of associated children. 


## likesController is responsible for creating and deleting likes for posts. 
    # Problem: Like and Dislike states of posts do not persist. 
    # Solution: I need something that persists the like and dislike states. Return the like status for the current user when retrieving posts. 

=begin      
    class PostsController < ApplicationController
    # ...

    # GET "/posts"
    def index  
        posts = Post.all
        posts_with_like_status = posts.map do |post|
        liked_by_current_user = current_user.present? && post.likes.exists?(user_id: current_user.id)
        post.as_json.merge(liked: liked_by_current_user)
        end
        render json: posts_with_like_status, status: :ok 
    end 

    ...

        the index action retrieves all posts and checks if each post has been liked by the current user. It includes the liked key in the response JSON, indicating whether the current user has liked the post or not.

        therefore, frontend can receive the liked attribute for each post and use it to display it appropriately in the UI. 
    end

=end 




