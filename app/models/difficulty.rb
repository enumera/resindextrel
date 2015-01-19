class Difficulty < ActiveRecord::Base
  attr_accessible :difficulty_ref, :difficulty_value, :user_id, :name, :name_status
  belongs_to :user
  
end
