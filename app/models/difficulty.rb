class Difficulty < ActiveRecord::Base
  attr_accessible :difficulty_ref, :difficulty_value, :user_id
  belongs_to :user
  
end
