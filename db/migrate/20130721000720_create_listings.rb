class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.integer :channel_id
      t.integer :video_id
      t.datetime :created_at

      t.timestamps
    end
    add_index :listings, :channel_id
    add_index :listings, :video_id
    add_index :listings, [:channel_id, :video_id], unique: true
  end
end
