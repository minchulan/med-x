class PostsController < ApplicationController
    before_action :find_post, only: [:show, :update, :destroy]
    skip_before_action :authorize_user, only: [:index]

    # GET "/posts"
    def index  
        posts = Post.all 
        render json: posts, status: :ok 
    end 

    # POST "/posts"
    def create 
        post = current_user.posts.create!(post_params) #associated build
        render json: post, status: :created 
    end 

    # GET "/posts/:id"
    def show  
        render json: @post, status: :ok 
    end 

    # PATCH "/posts/:id"
    def update 
        @post.update!(post_params)
        render json: @post, status: :accepted 
    end 

    # DELETE "/posts/:id"
    def destroy
        @post.destroy 
        head :no_content 
    end 

    private 

    def post_params 
        params.require(:post).permit(:title, :content) 
    end 

    def find_post
        @post = Post.find(params[:id])
    end 
end


#------------------------------------------------------
=begin  

ActiveStorage 

utilize ActiveStorage in to associate pictures with instances of a Post. 

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