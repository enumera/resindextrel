class TimeRecordsController < ApplicationController
  # GET /time_records
  # GET /time_records.json
  before_filter :authenticate
  
  def index
    @time_records = TimeRecord.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @time_records }
    end
  end

  # GET /time_records/1
  # GET /time_records/1.json
  def show
    @time_record = TimeRecord.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @time_record }
    end
  end

  # GET /time_records/new
  # GET /time_records/new.json
  def new
    @time_record = TimeRecord.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @time_record }
    end
  end

  # GET /time_records/1/edit
  def edit
    @time_record = TimeRecord.find(params[:id])
  end

  # POST /time_records
  # POST /time_records.json
  def create
    @time_record = TimeRecord.new(params[:time_record])

    # binding.pry

    respond_to do |format|
      if @time_record.save
        format.html { redirect_to @time_record, notice: 'Time record was successfully created.' }
        format.json { render json: @time_record, status: :created, location: @time_record }
        format.mobile { render json: @time_record, status: :created, location: @time_record }
      else
        format.html { render action: "new" }
        format.json { render json: @time_record.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /time_records/1
  # PUT /time_records/1.json
  def update
    @time_record = TimeRecord.find(params[:id])

    # binding.pry

    respond_to do |format|
      if @time_record.update_attributes(params[:time_record])

        time_params = {}

         @time_record = TimeRecord.find(params[:id])

        time_allocated = @time_record.calculate_time(@time_record)


        # binding.pry

        @time_record = TimeRecord.find(params[:id])
        @time_record.hours = time_allocated[0]
        @time_record.minutes = time_allocated[1]

        time_params["time_record"] = {}
        time_params["time_record"]["hours"] = @time_record.hours
        time_params["time_record"]["minutes"] = @time_record.minutes

        

        @time_record.update_attributes(time_params[:time_record])

    
        format.html { redirect_to @time_record, notice: 'Time record was successfully updated.' }
        format.json { head :no_content}
        format.mobile {head :no_content}
      else
        format.html { render action: "edit" }
        format.json { render json: @time_record.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /time_records/1
  # DELETE /time_records/1.json
  def destroy
    @time_record = TimeRecord.find(params[:id])
    @time_record.destroy

    respond_to do |format|
      format.html { redirect_to time_records_url }
      format.json { head :no_content }
    end
  end
end
