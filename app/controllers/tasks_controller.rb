class TasksController < ApplicationController
  # GET /tasks
  # GET /tasks.json
  def index
    @user = User.find(params[:user_id])

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
      format.json { render json: @tasks }
    end
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
    @task = Task.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @task }
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
    @user = User.find(params[:user_id])
    @task = Task.new(params[:task])
        # binding.pry
    @goal = Goal.find(params[:task][:goal_id])

    @task.resindex = @task.calculate_resindex(@task)
  
    
    respond_to do |format|
      if @task.save

        @user.tasks << @task
        @goal.tasks << @task
        # format.html { redirect_to user_task_path(@user, @task), notice: 'Task was successfully created.' }
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
    @user = User.find(params[:user_id])
    @task = Task.find(params[:id])
    @timerecords = TimeRecord.where(task_id: params[:id], state: "toallocate")

    puts "--------------------------------------"
    puts @timerecords

    # binding.pry

    if @timerecords.length != 0

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

      
      @task.update_attributes(effort_update[:effort_update])
       # binding.pry
    end

    
    respond_to do |format|
      if @task.update_attributes(params[:task])
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
end