class Task < ActiveRecord::Base
  attr_accessible :completed, :difficulty, :end_date, :estimate, :importance, :resindex, :start_date, :trello_type, :effort, :card_id, :card_name, :card_description, :url, :shortlink, :user_ids, :goal_id

    has_and_belongs_to_many :users
    has_one :goal
    has_many :comments




  def calculate_resindex(task)
   
    if task.effort.nil?
      task.effort = 0
    
    end
   
    a = Time.now.to_i
    puts task.end_date
    b = task.end_date.to_time.to_i
    
    time_left_in_days = (b - a)/(3600*24)

    puts '-------------------------------------------'
    puts b
    puts a
    time_left_in_days

 
    if b < a || time_left_in_days == 0
      resindex = 999
   else

      effort  = task.effort.to_f.round(2)
      estimate = task.estimate.to_f.round(2)
      

    # binding.pry
    resindex = (((task.difficulty.to_f * estimate) - effort)/ (task.importance.to_f * (time_left_in_days * 7)))
      
    # binding.pry

    resindex = resindex.round(3)
    end

    # binding.pry

    if resindex < 0
      resindex = 888
    end
    if task.completed == 1
      resindex = -999
    end
    
    return resindex

  end

end