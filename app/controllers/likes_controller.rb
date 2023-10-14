class LikesController < ApplicationController
    before_action :find_post
    # before_action :find_comment, only: [:create] # If likes can be associated with comments

    # POST "/posts/:post_id/likes"
    def create 
        like = Like.new(user: current_user, post: @post, comment: @comment)
        if like.save 
            render json: like, status: :created 
        else  
            render json: { errors: like.errors.full_messages }, status: :unprocessable_entity
        end 
    end 

    # DELETE "/posts/:post_id/likes/:id"
    def destroy  
        like = Like.find(params[:id])
        like.destroy 
        head :no_content
    end 

    private 

    def find_post  
        @post = Post.find(params[:post_id])
    end 

    # def find_comment 
    #     @comment = Comment.find(params[:comment_id]) if params[:comment_id]
    # end 
end
