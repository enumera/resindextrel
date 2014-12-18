class CreateCommentTypes < ActiveRecord::Migration
  def change
    create_table :comment_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
