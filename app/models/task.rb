class Task < ActiveRecord::Base
  attr_accessible :completed, :difficulty, :end_date, :estimate, :importance, :resindex, :start_date, :trello_type, :effort, :card_id, :card_name, :card_description, :url, :shortlink, :user_ids, :goal_id, :project_list_id, :project_id

    has_and_belongs_to_many :users
    belongs_to :goal
    has_many :comments
    belongs_to :project
  




  def calculate_resindex(task)
   
    if start_date.nil? || end_date.nil? 
    #   if task.completed=true
    #     resindex = -999
    #   else
      resindex = 0
    # end
    else


      if task.effort.nil?
        task.effort = 0
      end
     
      a = Time.now.to_i
      puts task.end_date
      b = task.end_date.to_time.to_i + (3599 * 24)

      seconds_in_a_day = 3600*24
      
      time_left_in_days = ((b - a)/seconds_in_a_day.to_f).round(3)

      puts 'this is  resindex calc--------------------------'
      puts b
      puts a
      puts time_left_in_days

 
    if b < a
      resindex = 999
       else
        # binding.pry
        # if (b-a ) < 86400
        #     time_left_in_days = 1
        

        # if start_date.day == end_date.day && Time.now.day == start_date.day && start_date.month == end_date.month && Time.now.month == start_date.month
        #     time_left_in_days == 1
        # end


          # time_left_in_days = 1 if time_left_in_days == 0

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

    if task.completed == true
      resindex = -999
    end

  end

    return resindex

  end

end
