class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :summary, :created_at, :likes_count, :liked, :like_id
 
  belongs_to :user
  has_many :comments 
  has_many :likes 

  def summary 
    # byebug 
    "#{self.object.title} - #{self.object.content[0..49]}..."
  end 

  def liked 
    current_user.present? && object.likes.exists?(user_id: current_user.id)
  end 

  def like_id
    if current_user.present? && object.likes.exists?(user_id: current_user.id)
      object.likes.find_by(user_id: current_user.id).id
    else
      nil
    end
  end
end


=begin   

  ## WHO IS SELF? SELF.OBJECT?
      - self is the instance of the post serializer
      - self.object is the post instance.
      - self.object.<attribute_name> to access a specific attribute of the post instance.

  ## Custom Methods:
    `summary`
        - def summary: This method defines a custom attribute summary for the serialized post. It combines the post's title with the first 50 characters of its content, followed by ellipsis. For example, if the title is "Post Title" and content is "This is the content of the post", the summary would be "Post Title - This is the content of the post...".

    `liked`
        - def liked: This method checks if the current_user is present (logged in) and if there exist likes associated with the current post where the user_id matches the current_user's id. If such a like exists, it returns true, indicating that the current user has liked the post. Otherwise, it returns false.
    
    `liked_id`
        - def like_id: This method checks if the current_user is present and if there exist likes associated with the current post where the user_id matches the current_user's id. If such a like exists, it retrieves the id of that like and returns it. If there is no matching like, it returns nil.

=end
