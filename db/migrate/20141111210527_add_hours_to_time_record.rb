class AddHoursToTimeRecord < ActiveRecord::Migration
  def change
    add_column :time_records, :hours, :integer
  end
end
