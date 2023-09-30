class CommentsController < ApplicationController

    # GET "/posts/:post_id/comments"
    def index  
        if params[:post_id]
            post = Post.find_by(id: params[:post_id])
            if post 
                render json: post.comments 
            else  
                render json: { error: "Cannot find post with id #{params[:post_id]}" }, status: :not_found
            end 
        else
            comments = Comment.all
            render json: comments
        end
    end 

    # GET "/comments/:id"
    def show
        comment = Comment.find_by(id: params[:id])
        if comment
            render json: comment, status: :ok
        else
            render json: { error: "Comment not found with id #{params[:id]}" }, status: :not_found
        end
    end

    # POST "/posts/:post_id/comments"
    def create
        if params[:post_id]
            post = Post.find(params[:post_id])
            comment = post.comments.create(comment_params)
            if comment.id 
                render json: comment, status: :ok
            else  
                render json: { error: comment.errors.full_messages.to_sentence }, status: :unprocessable_entity
            end 
        else
            render json: { error: "Missing post_id parameter" }, status: :unprocessable_entity
        end
    end

    # PATCH "/comments/:id"
    def update 
        comment = Comment.find_by(id: params[:id])
        if comment.nil?
            render json: { error: "Comment not found with id #{params[:id]}" }, status: :not_found
        elsif comment.update(comment_params)
            render json: comment, status: :ok
        else
            render json: { error: comment.errors.full_messages.to_sentence }, status: :unprocessable_entity
        end
    end

    # DELETE "/comments/:id"
    def destroy 
        comment = Comment.find_by(id: params[:id])
        if comment
            if comment.destroy 
                render json: { message: "Successfully destroyed comment!" }, status: :ok 
            else  
                render json: { error: comment.errors.full_messages.to_sentence }, status: :unprocessable_entity
            end 
        else
            render json: { error: "Comment not found with id #{params[:id]}" }, status: :not_found
        end
    end

end