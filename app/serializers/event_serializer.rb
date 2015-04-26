class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :starttime, :endtime, :all_day
end
