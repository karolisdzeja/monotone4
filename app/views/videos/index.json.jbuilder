json.array!(@videos) do |video|
  json.extract! video, :id, :title, :artist, :year, :youtube, :views
  json.url video_url(video, format: :json)
  if current_user and current_user.hearts.find_by video_id: video.id
    json.heart true
  else
    json.heart false
  end
end
