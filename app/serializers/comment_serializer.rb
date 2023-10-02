class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at 

  belongs_to :user
  belongs_to :post
end


=begin   
  the purpose of the serializer is to control how the models are represented in JSON format. Customize serializer to the data you want to expose to the clients and ensure that sensitive information is handled appropriately.
=end 