class Comment < ActiveRecord::Base
  attr_accessible :ctext, :task_id, :user_id

  belongs_to :task
  belongs_to :user

  
end
