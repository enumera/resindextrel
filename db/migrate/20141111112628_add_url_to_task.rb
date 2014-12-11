class AddUrlToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :url, :text
  end
end
