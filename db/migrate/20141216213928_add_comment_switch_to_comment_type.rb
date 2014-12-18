class AddCommentSwitchToCommentType < ActiveRecord::Migration
  def change
    add_column :comment_types, :comment_switch, :string
  end
end
