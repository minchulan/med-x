class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email

  has_many :posts 
  has_many :comments 
end
