puts "Seeding data..."

User.destroy_all

# Create users
admin = User.create(username: "admin", email: "admin@example.com", password: "password", bio: "Admin is a test user for MedX. Admin has full app authorization for testing purposes. Admin is not a real user.")
minchul = User.create(username: "minchulan", email: "itsminchul@gmail.com", password: "password", bio: "Minchul An is a licensed pharmacist in NY and CO. Min is currently a flex student at Flatiron School's Software Engineering program. Min has a passion for building products that improve the patient care experience.")
joey = User.create(username: "joey", email: "joey@gmail.com", password: "password", bio: "Joey is a test user without admin privileges. Joey is fictitious and has been created for testing purposes only.")

# Create posts and assign them to users
p1 = Post.create(title: "Post Title 1", content: "Some awesome lorem text lorem lorem text text", likes_count: 15, user: admin)
p2 = Post.create(title: "Post Title 2", content: "Some awesome lorem text lorem lorem text text", likes_count: 5, user: minchul)
p3 = Post.create(title: "Post Title 3", content: "Some awesome lorem text lorem lorem text text", likes_count: 10, user: joey)

# Create comments
p1.comments.create(user: admin, content: "This was a great post! Thanks for sharing!")
p2.comments.create(user: minchul, content: "This was a great post! Thanks for sharing!")
p3.comments.create(user: joey, content: "This was a great post! Thanks for sharing!")

puts "✅ Done seeding!"


