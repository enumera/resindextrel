class Project < ActiveRecord::Base
  attr_accessible :name, :goal_ids, :user_ids, :trello_project_id, :no_of_goals, :task_ids

  has_many :goals, dependent: :destroy
  has_many :tasks, dependent: :destroy

  has_and_belongs_to_many :users
end
