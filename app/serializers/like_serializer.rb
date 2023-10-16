class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :post_id, :created_at

  belongs_to :user # to include user details
  belongs_to :post # to include post details
  belongs_to :post, serializer: PostSerializer # to include post details
end

