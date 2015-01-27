class ChecklistSerializer < ActiveModel::Serializer
  attributes :id, :name, :task_id
  has_any :checklist_items
end
