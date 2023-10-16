class Like < ApplicationRecord
  belongs_to :user 
  belongs_to :post, counter_cache: :likes_count

  # validates_uniqueness_of :user_id, scope: :post_id

end


# By setting counter_cache: true in the belongs_to association in the Like model, Rails will automatically update the likes_count column in the associated posts table whenever a new like is created or deleted.