class ProjectsTasks < ActiveRecord::Migration
 def change
    create_table :projects_tasks, id: false do |t|
      t.belongs_to :project
      t.belongs_to :task
  
    end
  end
end
