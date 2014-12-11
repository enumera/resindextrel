class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :trello_type
      t.float :resindex
      t.boolean :completed
      t.date :start_date
      t.date :end_date
      t.float :estimate
      t.integer :difficulty
      t.integer :importance

      t.timestamps
    end
  end
end
