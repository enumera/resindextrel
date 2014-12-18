class HomeController < ApplicationController
  def index
    if !current_user.nil? 
     gon.user_id = current_user.id

    @user = User.find(current_user.id)
    @tasks = @user.tasks.all
  end
    
  end

  def index_old
       @user = User.find(1)
      @tasks = @user.tasks.all
  end

end
