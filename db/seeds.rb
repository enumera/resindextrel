# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(first_name: "Andrew", family_name: "Fyfe", trello:"AndrewFyfe1", password: "password", password_confirmation: "password", email: "enumera2000@yahoo.co.uk")

# # Goal.create(name: "First")

CommentType.create(name: "comment", comment_switch: "user")
CommentType.create(name: "action", comment_switch: "user")
CommentType.create(name: "issue", comment_switch: "user")
CommentType.create(name: "risk", comment_switch: "user")
CommentType.create(name: "decision", comment_switch: "user")
CommentType.create(name: "effort", comment_switch: "system")
CommentType.create(name: "edit", comment_switch: "user")
CommentType.create(name: "resindex_change", comment_switch: "system")

# Importance.destroy_all
# Difficulty.destroy_all


# Difficulty.create(name:"Easy-done it before", difficulty_ref: 1, difficulty_value: 1, user_id: 1, name_status: "active" )
# Difficulty.create(name:"Something slightly different", difficulty_ref: 2, difficulty_value: 2, user_id: 1, name_status: "active" )
# Difficulty.create(name:"Tricky", difficulty_ref: 3, difficulty_value: 3, user_id: 1, name_status: "active" )
# Difficulty.create(name:"Really difficult", difficulty_ref: 4, difficulty_value: 4, user_id: 1, name_status: "active" )
# Difficulty.create(name:"Mission Impossible!", difficulty_ref: 5, difficulty_value: 5, user_id: 1, name_status: "active" )

# Importance.create(name:"Would do", importance_ref: 1, importance_value: 5, user_id: 1, name_status: "active" )
# Importance.create(name:"Could do", importance_ref: 2, importance_value: 4, user_id: 1, name_status: "active" )
# Importance.create(name:"Should do", importance_ref: 3, importance_value: 3, user_id: 1, name_status: "active" )
# Importance.create(name:"Someone/I really needs this", importance_ref: 4, importance_value: 2, user_id: 1, name_status: "active" )
# Importance.create(name:"Someone/I REALLY needs this", importance_ref: 5, importance_value: 1, user_id: 1, name_status: "active" )

# Difficulty.create(name:"Easy-done it before", difficulty_ref: 1, difficulty_value: 1, user_id: 2, name_status: "active" )
# Difficulty.create(name:"Something slightly different", difficulty_ref: 2, difficulty_value: 2, user_id: 2, name_status: "active" )
# Difficulty.create(name:"Tricky", difficulty_ref: 3, difficulty_value: 3, user_id: 2, name_status: "active" )
# Difficulty.create(name:"Really difficult", difficulty_ref: 4, difficulty_value: 4, user_id: 2, name_status: "active" )
# Difficulty.create(name:"Mission Impossible!", difficulty_ref: 5, difficulty_value: 5, user_id: 2, name_status: "active" )

# Importance.create(name:"Would do", importance_ref: 1, importance_value: 5, user_id: 2, name_status: "active" )
# Importance.create(name:"Could do", importance_ref: 2, importance_value: 4, user_id: 2, name_status: "active" )
# Importance.create(name:"Should do", importance_ref: 3, importance_value: 3, user_id: 2, name_status: "active" )
# Importance.create(name:"Someone/I really needs this", importance_ref: 4, importance_value: 2, user_id: 2, name_status: "active" )
# Importance.create(name:"Someone/I REALLY needs this", importance_ref: 5, importance_value: 1, user_id: 2, name_status: "active" )


# Difficulty.create(name:"Easy-done it before", difficulty_ref: 1, difficulty_value: 1, user_id: 3, name_status: "active" )
# Difficulty.create(name:"Something slightly different", difficulty_ref: 2, difficulty_value: 2, user_id: 3, name_status: "active" )
# Difficulty.create(name:"Tricky", difficulty_ref: 3, difficulty_value: 3, user_id: 3, name_status: "active" )
# Difficulty.create(name:"Really difficult", difficulty_ref: 4, difficulty_value: 4, user_id: 3, name_status: "active" )
# Difficulty.create(name:"Mission Impossible!", difficulty_ref: 5, difficulty_value: 5, user_id: 3, name_status: "active" )

# Importance.create(name:"Would do", importance_ref: 1, importance_value: 5, user_id: 3, name_status: "active" )
# Importance.create(name:"Could do", importance_ref: 2, importance_value: 4, user_id: 3, name_status: "active" )
# Importance.create(name:"Should do", importance_ref: 3, importance_value: 3, user_id: 3, name_status: "active" )
# Importance.create(name:"Someone/I really needs this", importance_ref: 4, importance_value: 2, user_id: 3, name_status: "active" )
# Importance.create(name:"Someone/I REALLY needs this", importance_ref: 5, importance_value: 1, user_id: 3, name_status: "active" )


# Difficulty.create(name:"Easy-done it before", difficulty_ref: 1, difficulty_value: 1, user_id: 4, name_status: "active" )
# Difficulty.create(name:"Something slightly different", difficulty_ref: 2, difficulty_value: 2, user_id: 4, name_status: "active" )
# Difficulty.create(name:"Tricky", difficulty_ref: 3, difficulty_value: 3, user_id: 4, name_status: "active" )
# Difficulty.create(name:"Really difficult", difficulty_ref: 4, difficulty_value: 4, user_id: 4, name_status: "active" )
# Difficulty.create(name:"Mission Impossible!", difficulty_ref: 5, difficulty_value: 5, user_id: 4, name_status: "active" )

# Importance.create(name:"Would do", importance_ref: 1, importance_value: 5, user_id: 4, name_status: "active" )
# Importance.create(name:"Could do", importance_ref: 2, importance_value: 4, user_id: 4, name_status: "active" )
# Importance.create(name:"Should do", importance_ref: 3, importance_value: 3, user_id: 4, name_status: "active" )
# Importance.create(name:"Someone/I really needs this", importance_ref: 4, importance_value: 2, user_id: 4, name_status: "active" )
# Importance.create(name:"Someone/I REALLY needs this", importance_ref: 5, importance_value: 1, user_id: 4, name_status: "active" )

# Difficulty.create(name:"Easy-done it before", difficulty_ref: 1, difficulty_value: 1, user_id: 5, name_status: "active" )
# Difficulty.create(name:"Something slightly different", difficulty_ref: 2, difficulty_value: 2, user_id: 5, name_status: "active" )
# Difficulty.create(name:"Tricky", difficulty_ref: 3, difficulty_value: 3, user_id: 5, name_status: "active" )
# Difficulty.create(name:"Really difficult", difficulty_ref: 4, difficulty_value: 4, user_id: 5, name_status: "active" )
# Difficulty.create(name:"Mission Impossible!", difficulty_ref: 5, difficulty_value: 5, user_id: 5, name_status: "active" )

# Importance.create(name:"Would do", importance_ref: 1, importance_value: 5, user_id: 5, name_status: "active" )
# Importance.create(name:"Could do", importance_ref: 2, importance_value: 4, user_id: 5, name_status: "active" )
# Importance.create(name:"Should do", importance_ref: 3, importance_value: 3, user_id: 5, name_status: "active" )
# Importance.create(name:"Someone/I really needs this", importance_ref: 4, importance_value: 2, user_id: 5, name_status: "active" )
# Importance.create(name:"Someone/I REALLY needs this", importance_ref: 5, importance_value: 1, user_id: 5, name_status: "active" )


# Difficulty.create(name:"Easy-done it before", difficulty_ref: 1, difficulty_value: 1, user_id: 6, name_status: "active" )
# Difficulty.create(name:"Something slightly different", difficulty_ref: 2, difficulty_value: 2, user_id: 6, name_status: "active" )
# Difficulty.create(name:"Tricky", difficulty_ref: 3, difficulty_value: 3, user_id: 6, name_status: "active" )
# Difficulty.create(name:"Really difficult", difficulty_ref: 4, difficulty_value: 4, user_id: 6, name_status: "active" )
# Difficulty.create(name:"Mission Impossible!", difficulty_ref: 5, difficulty_value: 5, user_id: 6, name_status: "active" )

# Importance.create(name:"Would do", importance_ref: 1, importance_value: 5, user_id: 6, name_status: "active" )
# Importance.create(name:"Could do", importance_ref: 2, importance_value: 4, user_id: 6, name_status: "active" )
# Importance.create(name:"Should do", importance_ref: 3, importance_value: 3, user_id: 6, name_status: "active" )
# Importance.create(name:"Someone/I really needs this", importance_ref: 4, importance_value: 2, user_id: 6, name_status: "active" )
# Importance.create(name:"Someone/I REALLY needs this", importance_ref: 5, importance_value: 1, user_id: 6, name_status: "active" )








