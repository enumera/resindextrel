class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :ctext
      t.belongs_to :task
      t.belongs_to :user

      t.timestamps
    end
  end
end
