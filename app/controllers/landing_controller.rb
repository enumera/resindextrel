class LandingController < ApplicationController
  def index
    if current_user 
      redirect_to home_index_path
    end

  end
end
