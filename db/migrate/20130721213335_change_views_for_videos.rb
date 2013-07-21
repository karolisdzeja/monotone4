class ChangeViewsForVideos < ActiveRecord::Migration
  def change
    change_table :videos do |t|
      t.change :views, :integer, :default => 0
    end
  end
end
