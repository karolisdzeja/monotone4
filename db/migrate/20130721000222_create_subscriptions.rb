class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :channel_id
      t.integer :user_id
      t.string :last_video
      t.integer :video_time

      t.timestamps
    end
    add_index :subscriptions, :channel_id
    add_index :subscriptions, :user_id
    add_index :subscriptions, [:channel_id, :user_id], unique: true
  end
end
