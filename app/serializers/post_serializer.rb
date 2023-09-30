class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :summary

  belongs_to :user
  has_many :comments 

end
