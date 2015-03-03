class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user
  helper_method :mobile?
  helper_method :ipad?

  before_filter :prepare_for_mobile

  private 

  def mobile?
    if request.user_agent =~ /Mobile/
      if request.user_agent =~ /iPad/
        false
      else
        true
        request.format = :mobile
      end
    end
  end

  def ipad?
    if request.user_agent =~ /iPad/ && request.user_agent =~ /Mobile/
      true
    end
    
  end

def prepare_for_mobile

  request.format = :mobile if mobile?

end





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
    if params[:controller] == "users" 
      case params[:actions]
      when "index" "show" "destroy" "update"
       flash[:error] = "Please log in."
        redirect_to log_in_path
      end

    end
  end
end

  private
  def can_access_route
    if logged_in?
    raise 'Permissions rejected' unless authorized?(current_user, params[:controller], params[:action])
    # else
    #   redirect_to log_in_path
    end
  end

  private
  def authorized?(user, controller, action)
    # if current_user
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
              when "mobile_projects" then true
              when "tasks_resindex_to_be_reset" then true
              when "tasks_with_resindex" then true
              when "tasks_with_no_resindex" then true
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
   
  # end


end
