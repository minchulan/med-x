class CommentsController < ApplicationController
    # before_action :authorize_user
    before_action :load_post, only: [:index, :create]
    before_action :load_comment, only: [:show, :update, :destroy]
    before_action :check_owner, only: [:update, :destroy]

    # GET "/posts/:post_id/comments"
    def index  
        render json: @post.comments 
    end 

    # GET "/comments/:id"
    def show
        render json: @comment 
    end

    # POST "/posts/:post_id/comments"
    def create
        comment = @post.comments.build(comment_params)
        comment.user = current_user
        if comment.save 
            render json: comment, status: :created 
        else  
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end 
    end

    # PATCH "/comments/:id"
    def update 
        if @comment.update(comment_params)
            render json: @comment 
        else  
            render_unprocessable_entity(@comment)
        end 
    end

    # DELETE "/comments/:id"
    def destroy 
        @comment.destroy
        head :no_content
    end

    private 

    def comment_params 
        params.require(:comment).permit(:content)
    end 

    def load_post 
        @post = Post.find_by_id(params[:post_id])
    end 

    def load_comment 
        @comment = Comment.find_by_id(params[:id])
        render json: { error: "Comment not found with id #{params[:id]}" }, status: :not_found unless @comment 
    end 

    def check_owner 
        unless @comment.user == current_user
            render json: { errors: { User: "does not own this comment." } }, status: :forbidden 
        end 
    end 

end