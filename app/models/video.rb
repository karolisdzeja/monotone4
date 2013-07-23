class Video < ActiveRecord::Base
  has_many :hearts
  has_many :users, :through => :hearts
  has_many :listings
  has_many :channels, :through => :listings
  has_many :histories
  
  attr_accessible :title, :artist, :youtube, :year, :views
end
