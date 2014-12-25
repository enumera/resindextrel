class HomeController < ApplicationController
  def index
    if !current_user.nil? 
     gon.user_id = current_user.id
     gon.user_tasks = current_user.tasks.where(completed: false).count
     gon.user_projects = current_user.projects.count
     gon.user_goals = current_user.projects.map{|project| project.no_of_goals}.reduce(:+)

     if gon.user_goals.nil?
        gon.user_goals = 0
      end
      
  

    @user = User.find(current_user.id)
    @tasks = @user.tasks.all
  end
    
  end

  def index_old
       @user = User.find(1)
      @tasks = @user.tasks.all
  end

end
