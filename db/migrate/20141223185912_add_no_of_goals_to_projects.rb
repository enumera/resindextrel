class AddNoOfGoalsToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :no_of_goals, :integer
  end
end
