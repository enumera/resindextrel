class AddNameStatusToImportance < ActiveRecord::Migration
  def change
    add_column :importances, :name_status, :string
  end
end
