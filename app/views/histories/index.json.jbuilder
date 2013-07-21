json.array!(@histories) do |history|
  json.extract! history, :user_id, :video_id, :channel_id, :created_at
  json.url history_url(history, format: :json)
end
