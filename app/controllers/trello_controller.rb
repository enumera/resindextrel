class TrelloController < ApplicationController
  require 'httparty'
  def oauth

  # Create a new OAuth consumer to make the request to the oauth API
  # with the correct request token path, access token path, and
  # authorize path.

  consumer = OAuth::Consumer.new(   ENV["TRELLO_APP_ID"],
                                    ENV["TRELLO_APP_SECRET"],
                                    site: "https://trello.com",
                                    request_token_path: "/1/OAuthGetRequestToken",
                                    access_token_path: "/1/OAuthGetAccessToken",
                                    authorize_path: "/1/OAuthAuthorizeToken"  )

  # Get request token, passing in the callback url you want the user to
  # be redirected to after the user authenticates your application.
  # This will be make a request to the request_token_path passed into
  # the consumer. The application ID and secret will be passed in as
  # parameters and  the response will ba a request token object with a secret key.

  request_token = consumer.get_request_token(oauth_callback: "http://localhost:3000/trello/callback")

  # Store the request_token in the session, you'll need this during
  # the callback.

  session[:request_token] = request_token


  # Redirect the user to the authorization url provided
  # by the request token.

  redirect_to request_token.authorize_url

  end

  def callback

      # Retrieve the request token.
  request_token = session[:request_token]

  # binding.pry

  # Use the request token to make a request to the
  # access token path.

  access_token  = request_token.get_access_token(oauth_verifier: params[:oauth_verifier])

  # Uncomment below to stop drop into pry at this line.
  #

  user = current_user
  token = access_token.token
  # verifier = params[:oauth_verifier]
  # binding.pry

  trello = {}

  trello["user_id"] = current_user.id
  trello["token"] = token
  # trello["secret"] = verifier
  trello["website_service"] = "trello"

  OauthTable.create(trello) #make this a ternary to ensure that this record is only created if no record exists
# binding.pry
  # Hopefully you recieve an access token back with
  # a token and a secret. You can use this access
  # token to make authenticated HTTP requests.

  # "Access Token: #{access_token.inspect}"

  redirect_to root_path
  end

  def access
    @user = current_user
    # projects_to_load = []
    trello_api_uri = "https://trello.com/1/members/me"
    # https://api.trello.com/1/lists/name?53eb89dbc829a00dca5564abkey=8e474beb4e008617593dab5c21cd61ea&token=8d454d80c7a70da77b9da36388edb3c7412a3fe241662a59d4e179938b532c6a
    trello_keys = current_user.oauth_tables.where(website_service: "trello")
    trello_token = trello_keys[0].token
    # trello_token = "e821c83b3372d3717341643cbcae60d378be2c90ce8fa22825ad05c1a62c1945"
    trello_secret = trello_keys[0].secret
    app_key = ENV["TRELLO_APP_ID"]

    # url = "http://www.omdbapi.com/?t=#{}"
    # url = "https://trello.com/1/members/me?key=8e474beb4e008617593dab5c21cd61ea&token=e821c83b3372d3717341643cbcae60d378be2c90ce8fa22825ad05c1a62c1945"

    url2 = "https://trello.com/1/members/me?key=#{app_key}&token=#{trello_token}"

    url_cards = "#{trello_api_uri}/cards?key=#{app_key}&token=#{trello_token}"
    url_projects = "#{trello_api_uri}/boards?key=#{app_key}&token=#{trello_token}"
    url_organisations = "#{trello_api_uri}/organizations?key=#{app_key}&token=#{trello_token}"
    # url_lists = "#{trello_api_uri}/lists?key=#{app_key}&token=#{trello_token}"
    # binding.pry
    # html = HTTParty.get(url)
    

    html2 = HTTParty.get(url2)
    cards = HTTParty.get(url_cards)
    projects = HTTParty.get(url_projects)
    organisations = HTTParty.get(url_organisations)
  
  # binding.pry

  new_project = ""
    # (0..cards.length-1).each do |x|
    (0..cards.length-1).each do |x|

    list_url = "https://api.trello.com/1/lists/"

      list_id = cards[x]["idList"]
      board_id = cards[x]["idBoard"]

      found_project = false

      if !Goal.where(project_list_id: list_id).exists?
          
          (0..projects.length-1).each do |x|
            if found_project ==true
              break
            else

             if projects[x]["id"] == board_id
                if !Project.where(trello_project_id: projects[x]["id"]).exists?
                  new_project = Project.create(name: projects[x]["name"], trello_project_id: projects[x]["id"])
                  @user.projects << new_project 
                  # projects_to_load.push(projects[x]["id"])
                end
                found_project = true
              end
            end
          end


          project = Project.where(trello_project_id: board_id)
          list_to_find = "#{list_url}#{list_id}/name?key=#{app_key}&token=#{trello_token}"
          list_return = HTTParty.get(list_to_find)
          goal_name = list_return["_value"]
          new_goal = Goal.create(name: goal_name, project_list_id: list_id)
          # binding.pry
          project[0].goals << new_goal
          # binding.pry
      end

      # binding.pry

        if !Task.where(card_id: cards[x]["id"]).exists?
          user = current_user
          goal = Goal.where(project_list_id: list_id)
          project = Project.where(trello_project_id: board_id)
        new_task = Task.create(trello_type:"card", card_id: cards[x]["id"], card_name: cards[x]["name"], card_description: cards[x]["desc"],shortlink: cards[x]["shortLink"], url: cards[x]["url"], project_list_id: list_id, completed: false)
          user.tasks << new_task
          new_task.project = project[0]
          goal[0].tasks << new_task

        else

          user = current_user

          user_task = Task.where(card_id: cards[x]["id"])

          new_task_for_user = user_task[0]

          # binding.pry
          goal = Goal.where(project_list_id: list_id)

          new_goal_for_task = goal[0]
          # binding.pry
          if !user.tasks.include?Task.find(new_task_for_user.id)
            user.tasks << new_task_for_user
          end
          # binding.pry
          if new_task_for_user.goal_id != new_goal_for_task.id
            # binding.pry
            puts "-----------------------------------------------"
            puts new_task_for_user.id
            puts new_task_for_user.goal_id
            puts new_goal_for_task.id
            goal_to_remove_task = Goal.find(new_task_for_user.goal_id)
            puts goal_to_remove_task
            goal_to_remove_task.tasks.delete(new_task_for_user)
            # # binding.pry
            new_goal_for_task.tasks << new_task_for_user
         
          end
        end
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


    redirect_to root_path

  end
end
