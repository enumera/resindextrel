class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user
  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]

  end

  def logged_in?
    !!current_user
  end
  private
  def authenticate
    unless logged_in?
      flash[:error] = "You must be logged in to access this section of the site"
      redirect_to log_in_path
    end
  end

  private
  def can_access_route
    raise 'Permissions rejected' unless authorized?(current_user, params[:controller], params[:action])
  end

  private
  def authorized?(user, controller, action)
    # binding.pry
    case user.try(:role)
      when "admin" then true
      when "user" then 
        case controller
          when "tasks" then
            case action
              when "top_10" then true
              when "trello_only" then true
              when "non_trello" then true
              when "top10_trello" then true
              when "top10_non_trello" then true
              else

              if current_user == User.find(params[:user_id])
                true
              else
                false
              end
            end
          when "projects" then
            
            if action=="get_last_project"
              true
            else
             if current_user == User.find(params[:user_id])
              true
            else
              false
            end
          end
          when "users" then false
          
          when "sessions" then false
          else
            true
          end
      else 
          false
      end
   
  end

end
