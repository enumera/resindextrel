class User < ActiveRecord::Base
  has_secure_password
  after_create :update_after_create
  before_create :set_invitation_limit
  
  attr_accessible :family_name, :first_name, :rescue, :trello, :task_ids, :work_session, :password, :email, :password_confirmation, :project_ids, :role, :difficulty_ids, :importance_ids, :invitation_limit, :invitation_token

  validates_presence_of :first_name, :on => :create
  validates_presence_of :family_name, :on => :create
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :email, :on => :create
  validates_uniqueness_of :email

  has_and_belongs_to_many :tasks
  has_and_belongs_to_many :projects
  has_many :comments
  has_many :oauth_tables
  has_many :importances
  has_many :difficulties

  has_many :sent_invitations, :class_name => 'Invitation', :foreign_key => 'sender_id'
  belongs_to :invitation


  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end

    def send_password_reset
      generate_token(:password_reset_token)
      self.password_reset_sent_at = Time.zone.now
      save!
      UserMailer.password_reset(self).deliver
    end


  def update_after_create

    if self.id != 1 then
            self.update_attributes(role: "user")
    else
       self.update_attributes(role: "admin")
    end


    Difficulty.create(name:"Easy-done it before", difficulty_ref: 1, difficulty_value: 1, user_id: self.id, name_status: "active" )
    Difficulty.create(name:"Something slightly different", difficulty_ref: 2, difficulty_value: 2, user_id: self.id, name_status: "active" )
    Difficulty.create(name:"Tricky", difficulty_ref: 3, difficulty_value: 3, user_id: self.id, name_status: "active" )
    Difficulty.create(name:"Really difficult", difficulty_ref: 4, difficulty_value: 4, user_id: self.id, name_status: "active" )
    Difficulty.create(name:"Mission Impossible!", difficulty_ref: 5, difficulty_value: 5, user_id: self.id, name_status: "active" )

    Importance.create(name:"Would do", importance_ref: 1, importance_value: 5, user_id: self.id, name_status: "active" )
    Importance.create(name:"Could do", importance_ref: 2, importance_value: 4, user_id: self.id, name_status: "active" )
    Importance.create(name:"Should do", importance_ref: 3, importance_value: 3, user_id: self.id, name_status: "active" )
    Importance.create(name:"Someone/I really needs this", importance_ref: 4, importance_value: 2, user_id: self.id, name_status: "active" )
    Importance.create(name:"Someone/I REALLY needs this", importance_ref: 5, importance_value: 1, user_id: self.id, name_status: "active" )
  end
  def invitation_token
    invitation.token if invitation
  end

  def invitation_token=(token)
    self.invitation = Invitation.find_by_token(token)
  end



def set_invitation_limit
  self.invitation_limit = 1000
end


end
