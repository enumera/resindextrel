class GoalSerializer < ActiveModel::Serializer
  attributes :id, :name, :project_id, :project_list_id, :no_of_tasks

end
