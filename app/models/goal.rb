class Goal < ActiveRecord::Base
  attr_accessible :name, :project_id, :task_ids, :project_list_id, :no_of_tasks

  belongs_to :project
  has_many :tasks, dependent: :destroy

end
