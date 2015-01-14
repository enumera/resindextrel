class User < ActiveRecord::Base
  has_secure_password
  attr_accessible :family_name, :first_name, :rescue, :trello, :task_ids, :work_session, :password, :email, :password_confirmation, :project_ids, :role, :difficulty_ids, :importance_ids

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





end
