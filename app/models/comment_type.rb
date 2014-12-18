class CommentType < ActiveRecord::Base
  attr_accessible :name, :comment_ids, :comment_switch
  has_many :comments
end
