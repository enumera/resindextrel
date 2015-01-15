class AddNameToDifficulty < ActiveRecord::Migration
  def change
    add_column :difficulties, :name, :string
  end
end
