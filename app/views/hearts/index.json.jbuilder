json.array!(@hearts) do |heart|
  json.extract! heart, :user_id, :video_id, :created_at
  json.url heart_url(heart, format: :json)
end
