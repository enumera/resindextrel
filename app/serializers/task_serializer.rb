class TaskSerializer < ActiveModel::Serializer
  attributes :id, :completed, :difficulty, :end_date, :estimate, :importance, :resindex, :start_date, :trello_type, :effort, :card_id, :card_name, :card_description, :url, :shortlink, :user_ids, :goal_id, :project_list_id, :project_id

  has_one :project
  has_one :goal
  has_many :comments

end
