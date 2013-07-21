class History < ActiveRecord::Base
  belongs_to :user
  belongs_to :video
  belongs_to :channel
end
