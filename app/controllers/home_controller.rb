class HomeController < ApplicationController
  # before_filter :authenticate
  
  def index
    if !current_user.nil? 
     gon.user_id = current_user.id
     gon.user_tasks = current_user.tasks.where(completed: false).count
     gon.user_projects = current_user.projects.count
     gon.user_goals = current_user.projects.map{|project| project.no_of_goals}.reduce(:+)

     if mobile?
      gon.mobile = 1
    else
      gon.mobile = 0
    end

     if gon.user_goals.nil?
        gon.user_goals = 0
      end
      
        projects_to_load = current_user.projects
          projects_to_load.each do |project_id|

        @project = Project.where(id: project_id.id )
        @goals = @project[0].goals

        @goals.each do |goal|
          tasks = goal.tasks.length
          # goal.no_of_tasks = tasks
          goal.update_attributes(no_of_tasks: tasks)
        end
      end

      @user = current_user
      @projects = @user.projects

      @projects.each do |project|
        goals = project.goals.length
        project.update_attributes(no_of_goals: goals)
        # project.no_of_goals = goals
        # project.save
      end

      # @user = User.find(current_user.id)
      # @tasks = @user.tasks.all
    end
    
  end

  def index_old
       @user = User.find(1)
      @tasks = @user.tasks.all
  end

end

def mobile?
    if request.user_agent =~ /Mobile/
      if request.user_agent =~ /iPad/
        false
      else
        true
      end
    end
  end
