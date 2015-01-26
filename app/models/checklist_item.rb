class ChecklistItem < ActiveRecord::Base
  attr_accessible :checklist_id, :completed, :name
  has_one :checklist
  
end
