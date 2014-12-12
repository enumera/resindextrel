class Project < ActiveRecord::Base
  attr_accessible :name, :goal_ids, :user_ids

  has_many :goals

  has_and_belongs_to_many :users
end
