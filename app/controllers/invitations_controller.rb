class InvitationsController < ApplicationController
  # GET /invitations
  # GET /invitations.json
  def new
   @invitation = Invitation.new
  end


  def create
      @invitation = Invitation.new(params[:invitation])
      @invitation.sender = current_user
    
    if @invitation.save
      UserMailer.invitation(@invitation, invite_url(@invitation.token)).deliver
        flash[:notice] = "Thank you, invitation sent."
        redirect_to root_path  
    else
      render :action => 'new'
    end
  end

end
