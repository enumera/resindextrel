class ChecklistItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :completed, :checklist_id
end
