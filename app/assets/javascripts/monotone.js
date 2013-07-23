function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(document).ready(function() {
  
  var playlistVideoID = 0;
  var playlist;
  var startTime = 0;
  
  startPlayer();
  
  function startLooper() {
    var i = 0;
    if( store.enabled ) {
      var looperInterval = window.setInterval(function(){looper()},2000);
      function looper() {
        store.set('video', playlist[playlistVideoID]);
        store.set('time', $('#video-player').tubeplayer('data')['currentTime']);
        i++;
        console.log(i);
      }
    }
  }
  
  function startPlayer() {
    playlistVideoID = 0;
    $.get('/videos.json', function(data) {
      playlist = shuffle(data);
      if (typeof store.get('video') != 'undefined') {
        playlist.unshift(store.get('video'));
        startTime = parseInt(store.get('time'));
      }
      else {
        startTime = 0;
      }
      console.log(playlist);
      $('.icon-heart, #currently').css({'visibility':'visible'});
      $('#song-artist-title').html(playlist[playlistVideoID]['artist'] + " - " + playlist[playlistVideoID]['title']);
      if( playlist[playlistVideoID]['heart'] == true ) {
        $('#heart').addClass('active');
      }
      $('#video-player').tubeplayer({
        width: 1280, // the width of the player
        height: 720, // the height of the player
        allowFullScreen: 'true', // true by default, allow user to go full screen
        initialVideo: playlist[playlistVideoID]['youtube'], // the video that is loaded into the player
        preferredQuality: 'hd720',// preferred quality: default, small, medium, large, hd720
        autoPlay: true,
        start: startTime,
        showControls: false,
        onStop: function(){
          playNextVideo();
        }, // after the player is stopped
        onPlayerEnded: function() {
          playNextVideo();
        }
      });
      startLooper();
    });
  }

  function playNextVideo() {
    playlistVideoID += 1;
    $('#song-artist-title').html(playlist[playlistVideoID]['artist'] + " - " + playlist[playlistVideoID]['title']);
    if( playlist[playlistVideoID]['heart'] == true ) {
      $('#heart').addClass('active');
    }
    else {
      $('#heart').removeClass('active');
    }
    $('#video-player').tubeplayer('play',playlist[playlistVideoID]['youtube']);
  }
  
  // FullScreen button
  if($.support.fullscreen){
    screenHeight = screen.height;
    screenWidth = screen.width;
    $('#full-screen').click(function() {
      $('#video-player').fullScreen({
        // callback to change back to regular
        'callback': function(isFullScreen) {
          if (!isFullScreen) {
            $('#video-player').css({'width':'1280px','height':'720px'});
            $('#video-player').tubeplayer("size", {
              width: 1280, 
              height: 720
            });
            $('#video-player').tubeplayer('quality', 'hd720');
            $('#video-player').tubeplayer('seek', parseInt(store.get('time')));
          }
        }
      });
      $('#video-player').css({'width':screenWidth+'px','height':screenHeight+'px'});
      $('#video-player').tubeplayer('size', {
        width: screenWidth, 
        height: screenHeight
      });
      $('#video-player').tubeplayer('quality', 'hd1080');
      $('#video-player').tubeplayer('seek', parseInt(store.get('time')));
    });
  }
  
  // Hearts - AJAX
  $('#heart').click(function() {
    if(!$(this).hasClass('active')) {
      $.ajax({
        type: 'POST',
        url: '/hearts.json',
        data: {"video_id": playlist[playlistVideoID]['id'] },
        success: function() {
          $('#heart').addClass('active');
        }
      });
    }
    else {
      $.ajax({
        type: 'POST',
        url: '/hearts/'+playlist[playlistVideoID]['id']+'.json',
        data: { _method: 'delete' },
        success: function() {
          $('#heart').removeClass('active');
        }
      });
    }
  });
  
});