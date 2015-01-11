class CommentTypesController < ApplicationController
  # GET /comment_types
  # GET /comment_types.json

  before_filter :authenticate
  def index
    @comment_types = CommentType.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @comment_types, root: false }
    end
  end

  # GET /comment_types/1
  # GET /comment_types/1.json
  def show
    @comment_type = CommentType.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @comment_type }
    end
  end

  # GET /comment_types/new
  # GET /comment_types/new.json
  def new
    @comment_type = CommentType.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @comment_type }
    end
  end

  # GET /comment_types/1/edit
  def edit
    @comment_type = CommentType.find(params[:id])
  end

  # POST /comment_types
  # POST /comment_types.json
  def create
    @comment_type = CommentType.new(params[:comment_type])

    respond_to do |format|
      if @comment_type.save
        format.html { redirect_to @comment_type, notice: 'Comment type was successfully created.' }
        format.json { render json: @comment_type, status: :created, location: @comment_type }
      else
        format.html { render action: "new" }
        format.json { render json: @comment_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /comment_types/1
  # PUT /comment_types/1.json
  def update
    @comment_type = CommentType.find(params[:id])

    respond_to do |format|
      if @comment_type.update_attributes(params[:comment_type])
        format.html { redirect_to @comment_type, notice: 'Comment type was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @comment_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comment_types/1
  # DELETE /comment_types/1.json
  def destroy
    @comment_type = CommentType.find(params[:id])
    @comment_type.destroy

    respond_to do |format|
      format.html { redirect_to comment_types_url }
      format.json { head :no_content }
    end
  end
end
