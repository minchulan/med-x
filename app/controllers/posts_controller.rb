class PostsController < ApplicationController
    def index  
        @posts = Post.all 
        render json: @posts 
    end 

    def show  
        post = Post.find_by_username(params[:username])
        if post.valid? 
            render json: post 
        else  
            render json: { message: ""}
        end 
    end 

    def create 
    
    end 

    def update 
    end 

    def destroy
    end 

    private 

    def post_params 
        params.require(:post).permit(:title, :content, :user_id)
    end 
end
