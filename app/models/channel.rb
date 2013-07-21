class Channel < ActiveRecord::Base
  has_many :subscriptions
  has_many :users, :through => :subscriptions
  has_many :listings
  has_many :videos, :through => :listings
  has_many :histories
end
