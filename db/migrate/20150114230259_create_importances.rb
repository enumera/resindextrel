class CreateImportances < ActiveRecord::Migration
  def change
    create_table :importances do |t|
      t.integer :user_id
      t.integer :importance_ref
      t.float :importance_value

      t.timestamps
    end
  end
end
