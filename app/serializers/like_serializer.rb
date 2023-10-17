class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :post_id, :created_at, :user

  belongs_to :user # to include user details
  belongs_to :post # to include post details
  belongs_to :post, serializer: PostSerializer # to include post details

  def user 
    {
      username: self.object.user.username
    } 
  end 
  
end

