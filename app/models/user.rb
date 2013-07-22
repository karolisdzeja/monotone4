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
         :recoverable, :rememberable, :trackable, :validatable, :authentication_keys => [:login]

  validates :name, presence: true, uniqueness: { case_sensitive: false }
  
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me
  
  attr_accessor :login
  attr_accessible :login
  
  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    else
      where(conditions).first
    end
  end
  
end
