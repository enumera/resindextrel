class Goal < ActiveRecord::Base
  attr_accessible :name, :project_id, :task_ids

  has_one :project
  has_many :tasks

end
