class AddTrelloProjectIdToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :trello_project_id, :string
  end
end
