class AddCardIdToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :card_id, :string
  end
end
