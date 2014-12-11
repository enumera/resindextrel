class AddCardDescriptionToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :card_description, :text
  end
end
