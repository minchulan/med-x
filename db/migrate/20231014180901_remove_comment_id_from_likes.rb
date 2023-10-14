class RemoveCommentIdFromLikes < ActiveRecord::Migration[6.1]
  def change
    remove_column :likes, :comment_id
  end
end
