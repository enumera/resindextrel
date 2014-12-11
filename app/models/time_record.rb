class TimeRecord < ActiveRecord::Base
  attr_accessible :task_id, :user_id, :state, :hours, :minutes

  def calculate_time(record)
    time = []
    time_milli = record.updated_at - record.created_at

    hours = time_milli/(60*60)
    minutes = (time_milli - hours.round * (60*60))/(60)

    hours =  hours.round(0)
    minutes = minutes.round(0)

    time.push(hours)
    time.push(minutes)

    # binding.pry

  end

end
 