class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :user

  # belongs_to :user
  belongs_to :post

  # Include user's username in the serialized output
  def user
    {
      id: self.object.user.id,
      username: self.object.user.username
    }
  end
end


=begin   
  the purpose of the serializer is to control how the models are represented in JSON format. Customize serializer to the data you want to expose to the clients and ensure that sensitive information is handled appropriately.
=end 