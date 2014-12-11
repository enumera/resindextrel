class HomeController < ApplicationController
  def index
    @user = User.find(1)
    @tasks = @user.tasks.all
    
  end

  def index_old
       @user = User.find(1)
    @tasks = @user.tasks.all
  end

end
