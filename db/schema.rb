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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20130721185824) do

  create_table "channels", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "hearts", force: true do |t|
    t.integer  "user_id"
    t.integer  "video_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "hearts", ["user_id"], name: "index_hearts_on_user_id"
  add_index "hearts", ["video_id", "user_id"], name: "index_hearts_on_video_id_and_user_id", unique: true
  add_index "hearts", ["video_id"], name: "index_hearts_on_video_id"

  create_table "histories", force: true do |t|
    t.integer  "user_id"
    t.integer  "video_id"
    t.integer  "channel_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "listings", force: true do |t|
    t.integer  "channel_id"
    t.integer  "video_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "listings", ["channel_id", "video_id"], name: "index_listings_on_channel_id_and_video_id", unique: true
  add_index "listings", ["channel_id"], name: "index_listings_on_channel_id"
  add_index "listings", ["video_id"], name: "index_listings_on_video_id"

  create_table "rails_admin_histories", force: true do |t|
    t.text     "message"
    t.string   "username"
    t.integer  "item"
    t.string   "table"
    t.integer  "month",      limit: 2
    t.integer  "year",       limit: 5
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rails_admin_histories", ["item", "table", "month", "year"], name: "index_rails_admin_histories"

  create_table "subscriptions", force: true do |t|
    t.integer  "channel_id"
    t.integer  "user_id"
    t.string   "last_video"
    t.integer  "video_time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "subscriptions", ["channel_id", "user_id"], name: "index_subscriptions_on_channel_id_and_user_id", unique: true
  add_index "subscriptions", ["channel_id"], name: "index_subscriptions_on_channel_id"
  add_index "subscriptions", ["user_id"], name: "index_subscriptions_on_user_id"

  create_table "users", force: true do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.boolean  "admin",                  default: false
    t.string   "name"
    t.integer  "last_channel"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["name"], name: "index_users_on_name", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

  create_table "videos", force: true do |t|
    t.string   "title"
    t.string   "artist"
    t.integer  "year"
    t.string   "youtube"
    t.integer  "views"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
