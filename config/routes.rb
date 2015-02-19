Trelloindex::Application.routes.draw do
  
  # resources :checklist_items

  resources :checklists

  resources :checklist_items


  resources :difficulties


  resources :importances


  resources :oauth_tables


  get "trello/oauth"

  get "trello/callback"

  get "trello/access"

  resources :comment_types


resources :projects do
  resources :goals
end


resources :users do
  resources :projects
end


  resources :time_records


  get "home/index"
  get "home/index_old"

  resources :goals  
 

  resources :users  do
    resources :tasks
  end

  resources :tasks do 
      resources :comments
    end
    get "log_out" => "sessions#destroy", :as => "log_out"
    get "log_in" => "sessions#new", :as => "log_in"
    get "sign_up" => "users#new", :as => "sign_up"

    get "top_10" => "tasks#top_10", :as => "top10"

    get "trello_only" => "tasks#trello_only", :as => "trello_search"

    get "non_trello" => "tasks#non_trello", :as => "non_trello_search"

    get "top10_trello" => "tasks#top10_trello", :as => "top10trello"

    get "top10_non_trello" => "tasks#top10_non_trello", :as => "top10nontrello"
     get "tasks_with_no_resindex" => "tasks#tasks_with_no_resindex", :as => "no_resindex_tasks"
     get "tasks_with_resindex" => "tasks#tasks_with_resindex", :as => "resindex_tasks"

     get "tasks_resindex_to_be_reset" => "tasks#tasks_resindex_to_be_reset", :as => "resindex_reset"
    get "mobile_projects" => "tasks#mobile_projects", :as => "project_tasks"

    # root :to => "users#new"
    resources :users
    resources :sessions

    get "get_last_project" => "projects#get_last_project", :as => "lastProject"

  # root :to => 'home#index'


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.


    root :to => 'home#index'
  

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
