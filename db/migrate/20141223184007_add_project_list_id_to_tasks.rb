class AddProjectListIdToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :project_list_id, :string
  end
end
