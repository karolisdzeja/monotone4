class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :title
      t.string :artist
      t.integer :year
      t.string :youtube
      t.integer :views, :default => 0

      t.timestamps
    end
  end
end
