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
    post = Post.create(post_params)
    if post.id
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
=begin  

posts#create 
     In this action, you are attempting to create a new post based on the parameters sent in the request (post_params). After attempting to save the post, you check if the post has been successfully saved to the database using post.id.

    If the post is successfully saved (post.id is truthy), you render the created post as JSON with a 201 Created status code. If there are errors during the creation (for example, if the post doesn't pass validations), you render the errors as a JSON response with a 422 Unprocessable Entity status code.


find vs. find_by 
    find raises an error. find_by returns nil for us to render a custom message.

PATCH /posts/:id/like
    def increment_likes 
        post = Post.find_by(id: params[:id])
        if post 
            post.update(likes: post.likes + 1)
            render json: post 
        else  
            render json: { error: "Post not found" }, status: :not_found
        end 
    end 

=end 