class ImportanceSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :importance_ref, :importance_value
end
