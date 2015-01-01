class ProjectsController < ApplicationController
  # GET /projects
  # GET /projects.json
  def index
    @user = current_user
    user_projects = @user.projects
    @projects = user_projects.order("no_of_goals DESC")
    # binding.pry

    # @projects.each do |project|
    #   goals = project.goals.length
    #   project.no_of_goals = goals
    #   project.save
    # end


    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @projects, root: false }
    end
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
    @project = Project.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @project }
    end
  end

  # GET /projects/new
  # GET /projects/new.json
  def new
    @project = Project.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @project }
    end
  end

  # GET /projects/1/edit
  def edit
    @project = Project.find(params[:id])
  end

  # POST /projects
  # POST /projects.json
  def create
    @user = current_user
    @project = Project.new(params[:project])

    # binding.pry

    respond_to do |format|
      if @project.save
        @project.update_attributes(no_of_goals: 0)
        @user.projects << @project
        format.html { redirect_to user_project_path(@user, @project), notice: 'Project was successfully created.' }
        format.json { render json: user_project_path(@user, @project), status: :created, location: user_project_path(@user, @project) }
      else
        format.html { render action: "new" }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /projects/1
  # PUT /projects/1.json
  def update
    @project = Project.find(params[:id])

    respond_to do |format|
      if @project.update_attributes(params[:project])
        format.html { redirect_to @project, notice: 'Project was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project = Project.find(params[:id])
    @project.destroy

    respond_to do |format|
      format.html { redirect_to projects_url }
      format.json { head :no_content }
    end
  end
end
