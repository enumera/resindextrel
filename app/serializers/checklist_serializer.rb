class ChecklistSerializer < ActiveModel::Serializer
  attributes :id, :name, :task_id
end
