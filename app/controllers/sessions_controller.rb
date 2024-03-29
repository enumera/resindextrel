class SessionsController < ApplicationController
  
  # before_filter :can_access_route

  def new
  end



  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      gon.user_id = user.id
      redirect_to root_path
    else
      flash.now.alert = "Invalid email or password"
      render "new"
    end

  end


  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
  

end
