task :greet => :environment do 

  @projects = Project.all

  @projects.each do |project|
    if !project.goals.where(name: "unassigned").exists?
      Goal.create(name: "unassigned", project_id: project.id, no_of_tasks: 0)
    end
  end
end
