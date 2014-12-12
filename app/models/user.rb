class User < ActiveRecord::Base
  has_secure_password
  attr_accessible :family_name, :first_name, :rescue, :trello, :task_ids, :work_session, :password, :email, :password_confirmation, :project_ids

  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :email, :on => :create
  validates_uniqueness_of :email

  has_and_belongs_to_many :tasks
  has_and_belongs_to_many :projects
  has_many :comments



  # def encrypt_password
  #   if password.present?
  #     self.password_salt = BCrypt::Engine.generate_salt
  #     self.password_hash = BCrypt::Engine.has_secret(password, password_salt)
  #   end
  # end

end
