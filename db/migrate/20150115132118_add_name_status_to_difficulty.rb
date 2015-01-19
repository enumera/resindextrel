class AddNameStatusToDifficulty < ActiveRecord::Migration
  def change
    add_column :difficulties, :name_status, :string
  end
end
