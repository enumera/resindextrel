class Project < ActiveRecord::Base
  attr_accessible :name, :goal_ids

  has_many :goals
end
