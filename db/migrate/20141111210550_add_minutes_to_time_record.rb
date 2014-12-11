class AddMinutesToTimeRecord < ActiveRecord::Migration
  def change
    add_column :time_records, :minutes, :integer
  end
end
