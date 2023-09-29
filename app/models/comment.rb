class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post

  validates :content, presence: true
  validates :content, length: {in: 5...280}

  default_scope { order(date: :asc) }
end
 