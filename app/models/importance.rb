class Importance < ActiveRecord::Base
  attr_accessible :importance_ref, :importance_value, :user_id
  belongs_to :user
end
