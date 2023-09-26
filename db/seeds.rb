# require 'faker'

puts "Seeding data..."

User.destroy_all 

# Create users
admin = User.create(username: "admin", email: "admin@example.com", password: "password")
minchul = User.create(username: "minchul", email: "min@gmail.com", password: "password")
joey = User.create(username: "joey", email: "joey@gmail.com", password: "password")

# Create posts and assign them to users 
p1 = Post.create(title: "Post Title 1", content: "Some awesome lorem text lorem lorem text text", user: admin)
p2 = Post.create(title: "Post Title 2", content: "Some awesome lorem text lorem lorem text text", user: minchul)
p3 = Post.create(title: "Post Title 3", content: "Some awesome lorem text lorem lorem text text", user: joey)

# Create comments 
Comment.create(user: admin, post: p1, content: "This was a great post! Thanks for sharing!")
Comment.create(user: minchul, post: p2, content: "This was a great post! Thanks for sharing!")
Comment.create(user: joey, post: p3, content: "This was a great post! Thanks for sharing!")

puts "✅ Done seeding!"