task :invitations => :environment do

    @users = User.all

    @users.each do |u|
      
         u.invitation_limit = 1000
         u.save
     end
  end

