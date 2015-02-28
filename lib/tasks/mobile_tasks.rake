task :mobile_tasks => :environment do

  @tasks = Task.all

  @tasks.each do |task|
    if !task.project_id.nil?
      if task.goal_id.nil?
        @p = Project.find(task.project_id)
        @g = @p.goals.where(name: "unassigned")
        @g[0].tasks << task
        @g[0].no_of_tasks = @g[0].no_of_tasks + 1
      end
    end
  end
end


