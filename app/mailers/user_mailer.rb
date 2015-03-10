   class UserMailer < ActionMailer::Base
      default :from => "admin@resindex.co.uk"

      def registration_confirmation(user)
        @user = user
        mail(:to => user.email, :subject => "Registered")
      end

      def password_reset(user)
        @user = user
        mail(:to => user.email, :subject => "Password Reset")

      end

      def invitation(invitation, invite_url)
        @invite_url = invite_url
        @invitation = invitation
        mail(:to => invitation.recipient_email, :subject => "Invite to redindex") 
          # invitation.update_attribute(:sent_at, Time.now)

      end


    end
