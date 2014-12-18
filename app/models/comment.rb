class Comment < ActiveRecord::Base
  attr_accessible :ctext, :task_id, :user_id, :comment_type_id

  belongs_to :task
  belongs_to :user
  belongs_to :comment_type

  
end
