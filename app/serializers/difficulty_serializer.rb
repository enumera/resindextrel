class DifficultySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :difficulty_ref, :name, :name_status
end
