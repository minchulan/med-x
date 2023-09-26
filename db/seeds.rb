# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# require 'faker'

puts "Seeding data..."

User.destroy_all 

admin = User.create(username: "Admin", email: "admin@example.com", password: "password")
min = User.create(username: "Min100", email: "min@gmail.com", password: "password")
joe = User.create(username: "Joe100", email: "joe@gmail.com", password: "password")

admin_post_1 = admin.posts.create(title: "Admin Post Title 1", content: "Some awesome lorem text lorem lorem text text")
admin_post_2 = admin.posts.create(title: "Admin Post Title 2", content: "Some awesome lorem text lorem lorem text text")
admin_post_3 = admin.posts.create(title: "Admin Post Title 3", content: "Some awesome lorem text lorem lorem text text")
min_post_1 = min.posts.create(title: "Min Post Title 1", content: "Some awesome lorem text lorem lorem text text")
min_post_2 = min.posts.create(title: "Min Post Title 2", content: "Some awesome lorem text lorem lorem text text")
min_post_3 = min.posts.create(title: "Min Post Title 3", content: "Some awesome lorem text lorem lorem text text")
joe_post_1 = joe.posts.create(title: "Joe Post Title 1", content: "Some awesome lorem text lorem lorem text text")
joe_post_2 = joe.posts.create(title: "Joe Post Title 2", content: "Some awesome lorem text lorem lorem text text")
joe_post_3 = joe.posts.create(title: "Joe Post Title 3", content: "Some awesome lorem text lorem lorem text text")

admin.comments.create(post: min_post_1, content: "This was a great post! Thanks for sharing!")
admin.comments.create(post: joe_post_1, content: "This was a great post! Thanks for sharing!")
admin.comments.create(post: min_post_2, content: "This was a great post! Thanks for sharing!")
min.comments.create(post: admin_post_1, content: "This was a great post! Thanks for sharing!")
min.comments.create(post: joe_post_3, content: "This was a great post! Thanks for sharing!")
min.comments.create(post: joe_post_2, content: "This was a great post! Thanks for sharing!")
joe.comments.create(post: admin_post_2, content: "This was a great post! Thanks for sharing!")
joe.comments.create(post: min_post_3, content: "This was a great post! Thanks for sharing!")
joe.comments.create(post: min_post_2, content: "This was a great post! Thanks for sharing!")

puts "✅ Done seeding!"