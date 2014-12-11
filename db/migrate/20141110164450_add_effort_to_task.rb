class AddEffortToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :effort, :float
  end
end
