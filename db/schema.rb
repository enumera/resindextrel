# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20150114230349) do

  create_table "comment_types", :force => true do |t|
    t.string   "name"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.string   "comment_switch"
  end

  create_table "comments", :force => true do |t|
    t.text     "ctext"
    t.integer  "task_id"
    t.integer  "user_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.integer  "comment_type_id"
    t.float    "before_res"
    t.float    "after_res"
  end

  create_table "difficulties", :force => true do |t|
    t.integer  "user_id"
    t.integer  "difficulty_ref"
    t.float    "difficulty_value"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "goals", :force => true do |t|
    t.string   "name"
    t.integer  "project_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "project_list_id"
    t.integer  "no_of_tasks"
  end

  create_table "importances", :force => true do |t|
    t.integer  "user_id"
    t.integer  "importance_ref"
    t.float    "importance_value"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "oauth_tables", :force => true do |t|
    t.integer  "user_id"
    t.string   "token"
    t.string   "secret"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "website_service"
  end

  create_table "projects", :force => true do |t|
    t.string   "name"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
    t.string   "trello_project_id"
    t.integer  "no_of_goals"
  end

  create_table "projects_tasks", :id => false, :force => true do |t|
    t.integer "project_id"
    t.integer "task_id"
  end

  create_table "projects_users", :id => false, :force => true do |t|
    t.integer "project_id"
    t.integer "user_id"
  end

  create_table "tasks", :force => true do |t|
    t.string   "trello_type"
    t.float    "resindex"
    t.boolean  "completed"
    t.date     "start_date"
    t.date     "end_date"
    t.float    "estimate"
    t.integer  "difficulty"
    t.integer  "importance"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
    t.float    "effort"
    t.string   "card_id"
    t.text     "card_name"
    t.text     "card_description"
    t.text     "url"
    t.string   "shortlink"
    t.integer  "goal_id"
    t.string   "project_list_id"
    t.integer  "project_id"
  end

  create_table "tasks_users", :id => false, :force => true do |t|
    t.integer "user_id"
    t.integer "task_id"
  end

  create_table "time_records", :force => true do |t|
    t.integer  "user_id"
    t.integer  "task_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "state"
    t.integer  "hours"
    t.integer  "minutes"
  end

  create_table "trellos", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "first_name"
    t.string   "family_name"
    t.string   "trello"
    t.string   "rescue"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.integer  "work_session"
    t.string   "email"
    t.string   "password_digest"
    t.string   "role"
  end

end
