json.array!(@subscriptions) do |subscription|
  json.extract! subscription, :channel_id, :user_id, :last_video, :video_time
  json.url subscription_url(subscription, format: :json)
end
