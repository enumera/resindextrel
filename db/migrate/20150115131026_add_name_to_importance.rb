class AddNameToImportance < ActiveRecord::Migration
  def change
    add_column :importances, :name, :string
  end
end
