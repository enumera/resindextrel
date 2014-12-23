class AddProjectListIdToGoal < ActiveRecord::Migration
  def change
    add_column :goals, :project_list_id, :string
  end
end
