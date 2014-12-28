class AddAfterResToComments < ActiveRecord::Migration
  def change
    add_column :comments, :after_res, :float
  end
end
