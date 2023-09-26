class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content
  has_one :user
end
