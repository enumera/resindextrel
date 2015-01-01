class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :trello_project_id, :no_of_goals

  has_many :goals

end
