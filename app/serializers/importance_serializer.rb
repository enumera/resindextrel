class ImportanceSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :importance_ref, :name, :name_status
end
