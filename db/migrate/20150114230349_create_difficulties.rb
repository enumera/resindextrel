class CreateDifficulties < ActiveRecord::Migration
  def change
    create_table :difficulties do |t|
      t.integer :user_id
      t.integer :difficulty_ref
      t.float :difficulty_value

      t.timestamps
    end
  end
end
