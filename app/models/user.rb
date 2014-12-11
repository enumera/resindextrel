class User < ActiveRecord::Base
  attr_accessible :family_name, :first_name, :rescue, :trello, :task_ids, :work_session

  has_and_belongs_to_many :tasks
  has_many :comments
end
