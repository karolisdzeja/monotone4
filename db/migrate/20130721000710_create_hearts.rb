class CreateHearts < ActiveRecord::Migration
  def change
    create_table :hearts do |t|
      t.integer :user_id
      t.integer :video_id
      t.datetime :created_at

      t.timestamps
    end
    add_index :hearts, :video_id
    add_index :hearts, :user_id
    add_index :hearts, [:video_id, :user_id], unique: true
  end
end
