class Listing < ActiveRecord::Base
  belongs_to :channel
  belongs_to :video
end
