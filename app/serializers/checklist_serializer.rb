class ChecklistSerializer < ActiveModel::Serializer
  attributes :id, :name, :task_id
  has_many :checklist_items
end
