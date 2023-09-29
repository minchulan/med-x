class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy 
  has_many :commented_users, through: :comments, source: :user 

  validates_presence_of :title, :content
  validates :title, length: {in: 3..50}
  validates :content, length: {in: 5...280}

end

# `validate` - singular for custom validations
