class AddStateToTimeRecord < ActiveRecord::Migration
  def change
    add_column :time_records, :state, :string
  end
end
