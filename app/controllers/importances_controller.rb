class ImportancesController < ApplicationController
  # GET /importances
  # GET /importances.json
  def index
    @importances = Importance.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @importances }
    end
  end

  # GET /importances/1
  # GET /importances/1.json
  def show
    @importance = Importance.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @importance }
    end
  end

  # GET /importances/new
  # GET /importances/new.json
  def new
    @importance = Importance.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @importance }
    end
  end

  # GET /importances/1/edit
  def edit
    @importance = Importance.find(params[:id])
  end

  # POST /importances
  # POST /importances.json
  def create
    @importance = Importance.new(params[:importance])

    respond_to do |format|
      if @importance.save
        format.html { redirect_to @importance, notice: 'Importance was successfully created.' }
        format.json { render json: @importance, status: :created, location: @importance }
      else
        format.html { render action: "new" }
        format.json { render json: @importance.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /importances/1
  # PUT /importances/1.json
  def update
    @importance = Importance.find(params[:id])

    respond_to do |format|
      if @importance.update_attributes(params[:importance])
        format.html { redirect_to @importance, notice: 'Importance was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @importance.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /importances/1
  # DELETE /importances/1.json
  def destroy
    @importance = Importance.find(params[:id])
    @importance.destroy

    respond_to do |format|
      format.html { redirect_to importances_url }
      format.json { head :no_content }
    end
  end
end
