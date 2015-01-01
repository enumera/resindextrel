class CommentSerializer < ActiveModel::Serializer

  attributes :id, :ctext, :task_id, :user_id, :comment_type_id, :before_res, :after_res

  has_one :comment_type

end
