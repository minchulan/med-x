class UserSerializer < ActiveModel::Serializer
include Rails.application.routes.url_helpers
  attributes :id, :username, :email, :bio, :image 

  has_many :posts 
  has_many :comments 

  def image  
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end 
end
