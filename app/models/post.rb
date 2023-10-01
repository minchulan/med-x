class Post < ApplicationRecord
  # belongs_to :author, class_name: "User", foreign_key: "user_id"
  belongs_to :user 
  has_many :comments, dependent: :destroy 
  has_many :commented_users, through: :comments, source: :user 

  validates_presence_of :title, :content
  validates :title, length: {in: 3..20}
  validates :content, length: {in: 5...280}

  before_save :format_title 

  def format_title
    if self.title[0] != self.title[0].upcase 
      self.title = self.title.capitalize 
    end 
  end 

end

#---------------------------------------------
# `validate` - singular for custom validations
