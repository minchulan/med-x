class User < ApplicationRecord
    has_secure_password 
    
    has_many :posts, dependent: :destroy
    has_many :commented_posts, through: :comments, source: :post
end
