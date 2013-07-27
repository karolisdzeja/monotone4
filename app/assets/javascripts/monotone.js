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
        start: 0,
        showControls: false,
        onStop: function(){
          playNextVideo();
        }, // after the player is stopped
        onPlayerEnded: function() {
          playNextVideo();
        }
      });
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
  $('#full-screen').click(function() {
    windowHeight = $(window).height();
    windowWidth = $(window).width();
    $('#video-player').css({'width':windowWidth+'px','height':windowHeight+'px','position':'fixed','top':'0','left':'0'}).addClass('full');
    $('#video-player').tubeplayer('size', {
      width: windowWidth, 
      height: windowHeight
    });
    $('#video-player').tubeplayer('quality', 'hd1080');
    $('#normal-screen').show();
    $('.typekit-badge').hide();
  });
  $('#normal-screen').click(function() {
    $('#video-player').css({'width':'1280px','height':'720px','position':'static'}).removeClass('full');
      $('#video-player').tubeplayer('size', {
        width: 1280, 
        height: 720
      });
      $('#video-player').tubeplayer('quality', 'hd720');
    $('#normal-screen').hide();
  });
  
  $(window).resize(function() {
    console.log('resize event');
    if( $('#video-player').hasClass('full') ) {
      windowHeight = $(window).height();
      windowWidth = $(window).width();
      $('#video-player').css({'width':windowWidth+'px','height':windowHeight+'px'});
      $('#video-player').tubeplayer('size', {
        width: windowWidth, 
        height: windowHeight
      });
    }
  });
  
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