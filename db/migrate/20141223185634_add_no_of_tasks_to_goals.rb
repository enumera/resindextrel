class AddNoOfTasksToGoals < ActiveRecord::Migration
  def change
    add_column :goals, :no_of_tasks, :integer
  end
end
