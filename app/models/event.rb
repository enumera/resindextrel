class Event < ActiveRecord::Base
  attr_accessible :all_day, :description, :endtime, :starttime, :title

scope :between, lambda {|start_date, end_date|  
   {:conditions => ["? < starts_at < ?", Event.format_date(start_date),      Event.format_date(end_date)] }  
  }  

  def self.format_date(date_time)  
   Time.at(date_time.to_i).to_formatted_s(:db)  
  end


  def as_json(options = {})  
   {  
    :id => self.id,  
    :title => self.title,  
    :description => self.description || "",  
    :start => starttime.rfc822,  
    :end => endtime.rfc822,  
    :allDay => self.all_day,  
    :recurring => false,  
    :url => Rails.application.routes.url_helpers.event_path(id),  
   }  
  end  
end
