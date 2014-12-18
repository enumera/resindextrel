class AddCommentTypeIdToComment < ActiveRecord::Migration
  def change
    add_column :comments, :comment_type_id, :integer
  end
end
