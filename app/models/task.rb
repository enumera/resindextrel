class Task < ActiveRecord::Base
  attr_accessible :completed, :difficulty, :end_date, :estimate, :importance, :resindex, :start_date, :trello_type, :effort, :card_id, :card_name, :card_description, :url, :shortlink, :user_ids, :goal_id, :project_list_id, :project_id

    has_and_belongs_to_many :users
    belongs_to :goal
    has_many :comments
    belongs_to :project
    has_many :checklists
  


# rewrite this resindex method and apply tests in ruby

  def calculate_resindex(task, user_ref)
   
    if start_date.nil? || end_date.nil? 
   
      resindex = 0

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
  

        effort  = task.effort.to_f.round(2)
        estimate = task.estimate.to_f.round(2)

       user_difficulty_record = user_ref.difficulties.where(difficulty_ref: task.difficulty, name_status: "active")
       difficulty = user_difficulty_record[0].difficulty_value
      
      user_importance_record = user_ref.importances.where(importance_ref: task.importance, name_status: "active")
      importance = user_importance_record[0].importance_value

    # binding.pry
        resindex = (((difficulty * estimate) - effort)/ (importance * (time_left_in_days * 7)))
          
        # binding.pry

        resindex = resindex.round(3)
    end


    if resindex < 0
      resindex = 888
    end

    if task.completed == true
      resindex = -999
    end

  end

    return resindex

  end

def self.update_time_records(task, user)

    @timerecords = TimeRecord.where(task_id: task.id, state: "toallocate")

     if @timerecords.length != 0

      before_res = task.resindex

      minutes = @timerecords.map {|t| t.minutes}.reduce(:+)
      hours = @timerecords.map {|t| t.hours}.reduce(:+)

      if minutes==0 
         task.effort += hours
      else

        task.effort += hours + (minutes.to_f/60).round(2)

      end

      update_tr = {}
      update_tr["time_record"] = {}
      update_tr["time_record"]["state"] = "closed"
      # binding.pry
      @timerecords.each do |tr|
        tr.update_attributes(state: "closed")
      end

      task.resindex = task.calculate_resindex(task, user)

      effort_update = {}
      effort_update["effort_update"] = {}
      effort_update["effort_update"]["effort"] = task.effort
      effort_update["effort_update"]["resindex"] = task.resindex

      after_res = task.resindex
      task.update_attributes(effort_update[:effort_update])

      comment_text = "Resindex changed from #{before_res} to #{after_res}. <p><sub>Work done of #{hours} hours and #{minutes} minutes by #{user.first_name} on #{Time.now}.</sub></p>"

      Comment.create(task_id: task.id, comment_type_id: 6, user_id: user.id, ctext: comment_text, before_res: before_res, after_res: after_res)
       # binding.pry
    end
  
end


end
