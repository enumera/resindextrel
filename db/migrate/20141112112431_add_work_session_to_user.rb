class AddWorkSessionToUser < ActiveRecord::Migration
  def change
    add_column :users, :work_session, :integer
  end
end
