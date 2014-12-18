class CommentsController < ApplicationController
  # GET /comments
  # GET /comments.json
  def index
    @task = Task.find(params[:task_id])
    @comments = @task.comments.order("created_at")

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @comments, :include => [:comment_type]}
    end
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
    @task = Task.find(params[:task_id])
    @comment = @task.comments.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @comment }
    end
  end

  # GET /comments/new
  # GET /comments/new.json
  def new
    @comment = Comment.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @comment }
    end
  end

  # GET /comments/1/edit
  def edit
       @task = Task.find(params[:task_id])
    @comment = @task.comments.find(params[:id])
  end

  # POST /comments
  # POST /comments.json
  def create
       @task = Task.find(params[:task_id])
    @comment = Comment.new(params[:comment])

    respond_to do |format|
      if @comment.save
        format.html { redirect_to task_comment(@task, @comment), notice: 'Comment was successfully created.' }
        format.json { render json: task_comment_path(@task, @comment), status: :created, location: task_comment_path(@task,@comment) }
      else
        format.html { render action: "new" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /comments/1
  # PUT /comments/1.json
  def update
       @task = Task.find(params[:task_id])
    @comment = @task.comments.find(params[:id])

    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        format.html { redirect_to task_coment(@task, @comment), notice: 'Comment was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
       @task = Task.find(params[:task_id])
    @comment = @task.comments.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to comments_url }
      format.json { head :no_content }
    end
  end
end
