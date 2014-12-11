class AddCardNameToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :card_name, :text
  end
end
