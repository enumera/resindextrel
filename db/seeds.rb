# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(first_name: "Andrew", family_name: "Fyfe", trello:"AndrewFyfe1", password: "password", password_confirmation: "password", email: "enumera2000@yahoo.co.uk", role: "admin")

# Goal.create(name: "First")

CommentType.create(name: "comment", comment_switch: "user")
CommentType.create(name: "action", comment_switch: "user")
CommentType.create(name: "issue", comment_switch: "user")
CommentType.create(name: "risk", comment_switch: "user")
CommentType.create(name: "decision", comment_switch: "user")
CommentType.create(name: "effort", comment_switch: "system")
CommentType.create(name: "edit", comment_switch: "user")
CommentType.create(name: "resindex_change", comment_switch: "system")





