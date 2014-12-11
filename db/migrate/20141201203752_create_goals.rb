class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.string :name
      t.belongs_to :project

      t.timestamps
    end
  end
end
