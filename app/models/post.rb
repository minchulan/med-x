class Post < ApplicationRecord
  belongs_to :user 
  has_many :comments, dependent: :destroy 
  has_many :commented_users, through: :comments, source: :user 
  has_many :likes, dependent: :destroy 
#   has_one_attached :image 

  validates_presence_of :title, :content
  validates :title, length: {in: 3..60}
  validates :content, length: {in: 5...400}

  before_validation :format_title 

  def format_title
    if self.title[0] != self.title[0].upcase 
      self.title = self.title.capitalize 
    end 
  end 

end


#---------------------------------------------------

## `has_many_attached :images`
        # this macro is saying the Post class has a has_many association to a ActiveStorage::Attachment record and a has_many_through association to a ActiveStorage::Blob record with :images.

## Use before_validation Callbacks: 
      # Instead of before_save, consider using before_validation callbacks in your models. This ensures your formatting logic runs before validation, which is generally a good practice.

## Pagination: 
      # If your posts, comments, or users can be numerous, consider implementing pagination to limit the number of records returned in a single API call. Libraries like will_paginate or kaminari can help with this.

## Authorization Middleware: 
      # Consider using middleware like Pundit or CanCanCan for authorization. These libraries can help you manage authorization logic in a more structured way.

## Background Jobs: 
      # If there are tasks that don't need to be done in real-time (e.g., sending emails, processing images), consider using background job processing with libraries like Sidekiq or Delayed Job. This can improve the response time of your API endpoints.

## Database Indexing: 
      # Analyze your database queries and add appropriate indexes to columns frequently used in search conditions, joins, or order by clauses. This can significantly speed up database operations.

## Caching: 
      #Implement caching for read-heavy endpoints to reduce database load and improve response times. Rails provides various caching mechanisms, such as fragment caching and Russian Doll caching.

## Logging: 
      # Implement proper logging for your application, especially in production. Effective logging can help you diagnose issues and monitor the health of your application.