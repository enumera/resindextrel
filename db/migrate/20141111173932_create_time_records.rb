class CreateTimeRecords < ActiveRecord::Migration
  def change
    create_table :time_records do |t|
      t.integer :user_id
      t.integer :task_id
   

      t.timestamps
    end
  end
end
