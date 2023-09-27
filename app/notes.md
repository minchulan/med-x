## Nested Routes

Typically, it does not make sense to see all the comments created all in a list. We don't usually put a bunch of comments unrelated to each other all on the same page. However, it makes more sense if the comments had a tag and we grouped them by the tag.

# "/posts/1/comments" -> see all the comments for a specific post:

# The idea of Nested Routes is the following:

1. Want to access data specifically for a resource
2. Usually have a has_many / belongs_to that reflect relationship between 2 resources
3. Something in URL we need access to.

# Does it make sense to nest a show route?? I.e., 'comments/:id' in the parent 'post' route.

resources :posts do
resources :comments, only: [:index, :create]
end

The answer is: NO. The only advantage of nesting routes is we get extra information about the parent. 

I.e., 'posts/1/comments/1' = wrong!
I.e., 'posts/1/comments' = correct!

** No advantage in nesting `show`, `edit`, `update`, or `destroy` under a parent bc we have all the information about the parent already. It's a belongs_to / has_many relationship so the FK has to be there.

** Only the routes that make sense to nest are `index` and `create` bc we need to extract that extra piece of data from the URL. 
    I.e., "/posts/1/comments"
                   ^ :post_id => 1 


# Index: See all of the comments -OR- post 5's comments.
# Create: New comment for a specific post. 

# shallow: true => builds the 2 nested routes (create and index) and all of the non-nested routes

