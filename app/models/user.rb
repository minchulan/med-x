class User < ApplicationRecord
    has_secure_password 

    has_one_attached :image 
    
    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy 
    has_many :commented_posts, through: :comments, source: :post

    validates :email, presence: true, uniqueness: { message: "is already in use." }, format: { 
        with: /\A[\w+\-.]+@[\w\-.]+\.com\z/i, message: "is not a valid email address" 
    }
    validates :password, presence: true, length: { minimum: 4, message: "must be greater than 4 characters" }, if: -> { new_record? || !password.nil? }

    validates :username, presence: true, uniqueness: {
        message: "is already taken."
    }
end
