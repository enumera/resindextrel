class ChecklistItemsController < ApplicationController
  # GET /checklist_items
  # GET /checklist_items.json
  def index
   @checklist = Checklist.find(params[:checklist_id])
    @checklist_items = @checklist.checklist_items(params[:id])

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @checklist_items, root: false }
    end
  end

  # GET /checklist_items/1
  # GET /checklist_items/1.json
  def show
    @checklist = Checklist.find(params[:checklist_id])
    @checklist_items = @checklist.checklist_items.find(params[:id])
    # @checklist_item = ChecklistItem.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @checklist_item }
    end
  end

  # GET /checklist_items/new
  # GET /checklist_items/new.json
  def new

    @checklist_item = ChecklistItem.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @checklist_item }
    end
  end

  # GET /checklist_items/1/edit
  def edit
     # @checklist = Checklist.find(params[:checklist_id])
    @checklist_items = @checklist.checklist_items
    @checklist_item = @checklist.checklist_items.find(params[:id])
  end

  # POST /checklist_items
  # POST /checklist_items.json
  def create
    @checklist = Checklist.find(params[:checklist_id])
    @checklist_item = ChecklistItem.new(params[:checklist_item])

    respond_to do |format|
      if @checklist_item.save
        @checklist.checklist_items << @checklist_item
        # format.html { redirect_to checklist_checklist_item_url(@checklist, @checklist_item), notice: 'Checklist item was successfully created.' }
        format.json { render json: checklist_checklist_item_url(@checklist, @checklist_item), status: :created, location: checklist_checklist_item_url(@checklist,@checklist_item) }
      else
        format.html { render action: "new" }
        format.json { render json: @checklist_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /checklist_items/1
  # PUT /checklist_items/1.json
  def update
    @checklist = Checklist.find(params[:checklist_id])
    @checklist_item = @checklist.checklist_items.find(params[:id])

    respond_to do |format|
      if @checklist_item.update_attributes(params[:checklist_item])
        format.html { redirect_to checklist_item_url(@checklist, @checklist_item), notice: 'Checklist item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @checklist_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /checklist_items/1
  # DELETE /checklist_items/1.json
  def destroy
    @checklist_item = ChecklistItem.find(params[:id])
    @checklist_item.destroy

    respond_to do |format|
      format.html { redirect_to checklist_items_url }
      format.json { head :no_content }
    end
  end
end
