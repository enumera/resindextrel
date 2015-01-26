class Checklist < ActiveRecord::Base
  attr_accessible :name, :task_id, :checklist_item_ids

  has_many :checklist_items
  belongs_to :task
  
end
