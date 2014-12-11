class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :family_name
      t.string :trello
      t.string :rescue

      t.timestamps
    end
  end
end
