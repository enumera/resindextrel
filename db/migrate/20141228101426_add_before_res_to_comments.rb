class AddBeforeResToComments < ActiveRecord::Migration
  def change
    add_column :comments, :before_res, :float

  end
end
