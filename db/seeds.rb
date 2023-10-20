require 'faker'

puts "Seeding data..."

# Clear existing data 
Like.destroy_all
Comment.destroy_all
Post.destroy_all
User.destroy_all

# Create medical-related Faker data
medical_terms = ["pharmacist", "prescription", "rx", "hospital", "patient", "doctor", "nurse", "surgery", "medicine", "healthcare", "clinic", "pharmacy", "ambulance", "diagnosis", "treatment", "recovery", "science", "therapy", "health", "wellness"]

# Create users
admin = User.create(username: "admin", email: "admin@example.com", password: "password", bio: "Admin is a test user for MedX. Admin has full app authorization for testing purposes. Admin is not a real user.")
minchul = User.create(username: "minchulan", email: "itsminchul@gmail.com", password: "password", bio: "Minchul An is a licensed pharmacist in NY and CO. Min is currently a flex student at Flatiron School's Software Engineering program. Min has a passion for building products that improve the patient care experience.")
joey = User.create(username: "joey", email: "joey@gmail.com", password: "password", bio: "Joey is a test user without admin privileges. Joey is fictitious and has been created for testing purposes only.")

# Create more users
10.times do
  User.create(
    username: Faker::Internet.unique.username,
    email: Faker::Internet.unique.email,
    password: "password",
    bio: "Medical professional at #{Faker::Company.profession} specializing in #{medical_terms.sample}"
  )
end

users = User.all

# Create posts and assign them to users
5.times do
  Post.create(
    title: "#{medical_terms.sample.capitalize} #{Faker::Company.bs}",
    content: Faker::Lorem.paragraph(sentence_count: 3),
    likes_count: Faker::Number.between(from: 1, to: 50),
    user: users.sample
  )
end

posts = Post.all

# Create comments and likes
users.each do |user|
  rand(1..2).times do
    post = posts.sample
    Comment.create(
      user: user,
      post: post,
      content: Faker::Lorem.sentence(word_count: 10)
    )
    post.likes.create(user: user) if [true, false].sample # Randomly create likes for posts
  end
end

puts "✅ Done seeding!"




