class CreateHistories < ActiveRecord::Migration
  def change
    create_table :histories do |t|
      t.integer :user_id
      t.integer :video_id
      t.integer :channel_id
      t.datetime :created_at

      t.timestamps
    end
  end
end
