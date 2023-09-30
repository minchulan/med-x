class User < ApplicationRecord
    has_secure_password 
    
    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy 
    has_many :commented_posts, through: :comments, source: :post

    validates :email, presence: true, uniqueness: { message: "is already in use." }
    validates :password, length: { minimum: 4, message: "must be greater than 4 characters" }, if: -> { new_record? || !password.nil? }
end
