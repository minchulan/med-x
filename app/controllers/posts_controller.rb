class PostsController < ApplicationController
    def index  
        posts = Post.all 
        render json: posts, status: :ok 
    end 

    def show  
        post = Post.find_by_username(params[:username])
        if post.valid? 
            render json: post, status: :ok 
        else  
            render json: { message: ""}, status: :not_found
        end 
    end 

    def create 
    
    end 

    def update 
    end 

    def destroy
    end 

    private 

    # def post_params 
    #     params.require(:post).permit(:title, :content)
    # end 
end
