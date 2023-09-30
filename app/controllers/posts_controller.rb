class PostsController < ApplicationController

  # GET "/posts"
  def index  
    posts = Post.all 
    render json: posts, status: :ok
  end 

  def ordered
    posts = Post.sort_desc_by_title
    render json: posts, status: :ok
  end 

  # POST "/posts"
  def create 
    post = Post.new(post_params)
    if post.save
      render json: post, status: :created 
    else  
      render json: { errors: post.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end 
  end 

  # GET "/posts/:id"
  def show  
    post = Post.find_by(id: params[:id])
    if post
      render json: post, status: :ok
    else  
      render json: { error: "Post not found with id #{params[:id]}" }, status: :not_found
    end 
  end 

  # PATCH "/posts/:id"
  def update 
    post = Post.find_by(id: params[:id])
    if post 
      post.update(post_params)
      render json: post, status: :ok
    else  
      render json: { error: "Post not found with id #{params[:id]}" }, status: :not_found
    end 
  end 

  # DELETE "/posts/:id"
  def destroy
    post = Post.find_by(id: params[:id])
    if post
      post.destroy 
      head :no_content 
    else
      render json: { error: "Post not found with id #{params[:id]}" }, status: :not_found
    end 
  end 

  private 

  def post_params 
    params.require(:post).permit(:title, :content)
  end 
end


#------------------------------------------------------

# find raises an error. find_by returns nil for us to render a custom message.

# # PATCH /posts/:id/like
# def increment_likes 
#     post = Post.find_by(id: params[:id])
#     if post 
#         post.update(likes: post.likes + 1)
#         render json: post 
#     else  
#         render json: { error: "Post not found" }, status: :not_found
#     end 
# end 


=begin  
    def index  
        if params[:user_id]
            user = User.find_by(id: params[:user_id])
            posts = user.posts 
        else  
            posts = Post.all 
        end 
        
        render json: posts 
    end 
=end 