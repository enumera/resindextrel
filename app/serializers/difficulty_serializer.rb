class DifficultySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :difficulty_ref, :difficulty_value, :name, :name_status
end
