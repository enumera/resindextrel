class OauthTablesController < ApplicationController
  # GET /oauth_tables
  # GET /oauth_tables.json
  before_filter :authenticate
  
  def index
    @oauth_tables = OauthTable.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @oauth_tables }
    end
  end

  # GET /oauth_tables/1
  # GET /oauth_tables/1.json
  def show
    @oauth_table = OauthTable.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @oauth_table }
    end
  end

  # GET /oauth_tables/new
  # GET /oauth_tables/new.json
  def new
    @oauth_table = OauthTable.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @oauth_table }
    end
  end

  # GET /oauth_tables/1/edit
  def edit
    @oauth_table = OauthTable.find(params[:id])
  end

  # POST /oauth_tables
  # POST /oauth_tables.json
  def create
    @oauth_table = OauthTable.new(params[:oauth_table])

    respond_to do |format|
      if @oauth_table.save
        format.html { redirect_to @oauth_table, notice: 'Oauth table was successfully created.' }
        format.json { render json: @oauth_table, status: :created, location: @oauth_table }
      else
        format.html { render action: "new" }
        format.json { render json: @oauth_table.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /oauth_tables/1
  # PUT /oauth_tables/1.json
  def update
    @oauth_table = OauthTable.find(params[:id])

    respond_to do |format|
      if @oauth_table.update_attributes(params[:oauth_table])
        format.html { redirect_to @oauth_table, notice: 'Oauth table was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @oauth_table.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /oauth_tables/1
  # DELETE /oauth_tables/1.json
  def destroy
    @oauth_table = OauthTable.find(params[:id])
    @oauth_table.destroy

    respond_to do |format|
      format.html { redirect_to oauth_tables_url }
      format.json { head :no_content }
    end
  end
end
