class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :summary, :created_at
 
  belongs_to :user
  has_many :comments 

  def summary 
    # byebug 
    "#{self.object.title} - #{self.object.content[0..49]}..."
  end 
end

# self is the instance of the post serializer
# self.object is the post instance.
# self.object.<attribute_name> to access a specific attribute of the post instance.
