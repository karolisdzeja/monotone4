class User < ActiveRecord::Base
  has_many :hearts
  has_many :videos, :through => :hearts
  has_many :subscriptions
  has_many :channels, :through => :subscriptions
  has_many :histories
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
   validates :name, uniqueness: true
end
