class PostsController < ApplicationController

    # GET /posts
    def index  
        posts = Post.all 
        render json: posts, status: :ok 
    end 

    # GET /posts/:id
    def show  
        post = Post.find_by_id(params[:id])
        if post
            render json: post, status: :ok 
        else  
            render json: { error: "Post not found" }, status: :not_found
        end 
    end 

    # POST /posts
    def create 
        post = Post.create(post_params)
        if post.valid? 
            render json: patient, status: :created 
        else  
            render json: { errors: "Unable to create a new post." }, status: :unprocessable_entity
        end 
    end 

    # PATCH /posts/:id
    def update 
        post = Post.find_by(id: params[:id])
        if post 
            post.update(post_params)
            render json: post
        else  
            render json: { error: "Post not found" }, status: :not_found 
        end 
    end 

    # DELETE /posts/:id
    def destroy
    end 

    private 

    def post_params 
        params.require(:post).permit(:title, :content)
    end 
end


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
