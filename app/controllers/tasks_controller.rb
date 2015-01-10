class TasksController < ApplicationController
  # GET /tasks
  # GET /tasks.json
  def index
    @user = current_user

    task = @user.tasks

    task.each do |t|
      t.resindex = t.calculate_resindex(t)

      effort_update = {}
      effort_update["resindex_update"] = {}
      effort_update["resindex_update"]["resindex"] = t.resindex

      t.update_attributes(effort_update[:effort_update])

    end
    @tasks = @user.tasks.order("resindex DESC")


    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tasks, root: false }
    end
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
    @task = Task.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @task, root: false }
    end
  end

  # GET /tasks/new
  # GET /tasks/new.json
  def new
    @task = Task.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @task }
    end
  end

  # GET /tasks/1/edit
  def edit
    @task = Task.find(params[:id])
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @user = current_user
    @task = Task.new(params[:task])
        # binding.pry
    @goal = Goal.find(params[:task][:goal_id])
    @project = Project.find(params[:task][:project_id])
    @task.resindex = @task.calculate_resindex(@task)
  
    
    respond_to do |format|
      if @task.save

        @user.tasks << @task
        @goal.tasks << @task
        @project.tasks << @task
        goal_tasks = @goal.tasks.length
        @goal.update_attributes(no_of_tasks: goal_tasks)
        # format.html { redirect_to user_task_path(@user, @task), notice: 'Task was successfully created.' }
          comment_text = "New task created with Resindex set from to #{@task.resindex}. <p><sub>By #{@user.first_name} on #{Time.now}.</sub></p>"

      Comment.create(task_id: @task.id, comment_type_id: 6, user_id: @user.id, ctext: comment_text, before_res: @task.resindex, after_res: 0.0)
        format.json { render json: user_task_path(@user, @task), status: :created, location: user_task_path(@user, @task) }
      else
        format.html { render action: "new" }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /tasks/1
  # PUT /tasks/1.json
  def update
    # @user = User.find(params[:user_id])
    @user = current_user
    @task = Task.find(params[:id])
    initial_task = @task
    @timerecords = TimeRecord.where(task_id: params[:id], state: "toallocate")
    before_change_res = @task.resindex
    @goal = Goal.find(@task.goal_id)
    @project = Project.find(@task.project_id)
    before_res = 0.0
    after_res = 0.0

    puts "--------------------------------------"
    puts @timerecords

    # binding.pry

    if @timerecords.length != 0

      before_res = @task.resindex

      minutes = @timerecords.map {|t| t.minutes}.reduce(:+)
      hours = @timerecords.map {|t| t.hours}.reduce(:+)

      if minutes==0 
         @task.effort += hours
      else

        @task.effort += hours + (minutes.to_f/60).round(2)

      end

      @task.resindex = @task.calculate_resindex(@task)

      effort_update = {}
      effort_update["effort_update"] = {}
      effort_update["effort_update"]["effort"] = @task.effort
      effort_update["effort_update"]["resindex"] = @task.resindex

      after_res = @task.resindex
      @task.update_attributes(effort_update[:effort_update])

      comment_text = "Resindex changed from #{before_res} to #{after_res}. <p><sub>Work done of #{hours} hours and #{minutes} minutes by #{@user.first_name} on #{Time.now}.</sub></p>"

      Comment.create(task_id: @task.id, comment_type_id: 6, user_id: @user.id, ctext: comment_text, before_res: before_res, after_res: after_res)
       # binding.pry
    end



    respond_to do |format|
      if @task.update_attributes(params[:task])
        
          if before_res == 0.0
            before_res = @task.resindex
            @task.resindex = @task.calculate_resindex(@task)

              update = {}
              update["changed_task"] = {}
              update["changed_task"]["resindex"] = @task.resindex

               @task.update_attributes(update[:changed_task])
               after_res = @task.resindex
          
            if after_res == -999.0 && before_res != after_res
              comment_text = "Job marked as completed. <p><sub>Set by #{@user.first_name} on #{Time.now}.</sub></p>"

              Comment.create(task_id: @task.id, comment_type_id: 7, user_id: @user.id, ctext: comment_text, before_res: before_res, after_res: after_res)

            elsif before_res != after_res  && after_res != 999.0
              comment_text = "Resindex changed from #{before_res} to #{after_res}. <p><sub>Changes made by #{@user.first_name} on #{Time.now}.</sub></p>"
        
              Comment.create(task_id: @task.id, comment_type_id: 7, user_id: @user.id, ctext: comment_text, before_res: before_res, after_res: after_res)
            end

          end
            if @goal.id != initial_task.goal_id

            first_goal_tasks_to_change = Goal.find(initial_task.goal_id)
            new_no_of_tasks = first_goal_tasks_to_change.tasks.length

            first_goal_tasks_to_change.update_attributes(no_of_tasks: new_no_of_tasks)

            second_goal_tasks_to_change = Goal.find(@goal.id)
            
            new_no_of_tasks2 = second_goal_tasks_to_change.tasks.length

            second_goal_tasks_to_change.update_attributes(no_of_tasks: new_no_of_tasks2) 

            # binding.pry

           comment_text = "Goal changed from  #{second_goal_tasks_to_change.name} to #{first_goal_tasks_to_change.name}. <p><sub>Changes made by #{@user.first_name} on #{Time.now}.</sub></p>"

          Comment.create(task_id: @task.id, comment_type_id: 7, user_id: @user.id, ctext: comment_text, before_res: before_res, after_res: after_res)

          end
        


        format.html { redirect_to user_task_path(@user, @task), notice: 'Task was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task = Task.find(params[:id])
    @task.destroy

    respond_to do |format|
      format.html { redirect_to tasks_url }
      format.json { head :no_content }
    end
  end

  def top_10

    @user = current_user
    @tasks = @user.tasks.order("resindex DESC").limit(10)

    # binding.pry
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tasks, root: false }
    end

  end

  def trello_only
    @user = current_user
    @tasks = @user.tasks.where(trello_type: "card").order("resindex DESC")

    # binding.pry
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tasks, root: false }
    end
  end

  def non_trello
        @user = current_user
        @tasks = @user.tasks.where(trello_type: nil).order("resindex DESC")

    # binding.pry
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tasks, root: false }
    end
  end

  def top10_trello
        @user = current_user
        @tasks = @user.tasks.where(trello_type: "card").order("resindex DESC").limit(10)


    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tasks, root: false }
    end
  end


  def top10_non_trello
        @user = current_user
        @tasks = @user.tasks.where(trello_type: nil).order("resindex DESC").limit(10)

    # binding.pry
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tasks, root: false }
    end
  end



end
