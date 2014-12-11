class AddShortlinkToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :shortlink, :string
  end
end
