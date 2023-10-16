class Post < ApplicationRecord
  before_save :format_title 

  belongs_to :user 
  has_many :comments, dependent: :destroy 
  has_many :commented_users, through: :comments, source: :user 
  has_many :likes, dependent: :destroy 

  validates_presence_of :title, :content
  validates :title, length: {in: 3..60}
  validates :content, length: {in: 5...400}


  def format_title
    if self.title[0] != self.title[0].upcase 
      self.title = self.title.capitalize 
    end 
  end 

end

#---------------------------------------------
# `validate` - singular for custom validations
