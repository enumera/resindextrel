class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to home_index_path, :notice => "logged in"
    else
      flash.now.alert = "Invalid email or password"
      render "new"
    end

  end


  def destroy
    session[:user_id] = nil
    redirect_to root_path, :notice => "Logged out"
  end
  

end
