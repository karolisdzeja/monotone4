json.array!(@videos) do |video|
  json.extract! video, :title, :artist, :year, :youtube, :views
  json.url video_url(video, format: :json)
end
