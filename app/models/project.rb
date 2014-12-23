class Project < ActiveRecord::Base
  attr_accessible :name, :goal_ids, :user_ids, :trello_project_id, :no_of_goals

  has_many :goals

  has_and_belongs_to_many :users
end
