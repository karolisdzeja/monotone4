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
  
  var currentVideoID = 0;
  var playlist;
  startPlayer(1);
  
  function startPlayer(channel) {
    currentVideoID = 0;
    $.get('http://monotone-15903.usw1.actionbox.io:3000/videos.json', function(data) {
      playlist = shuffle(data);
      $('#video-player').tubeplayer({
        width: 1280, // the width of the player
        height: 720, // the height of the player
        allowFullScreen: 'true', // true by default, allow user to go full screen
        initialVideo: playlist[currentVideoID]['youtube'], // the video that is loaded into the player
        preferredQuality: 'hd720',// preferred quality: default, small, medium, large, hd720
        autoPlay: true,
        showControls: false,
        onStop: function(){
          playNextVideo();
        }, // after the player is stopped
        onPlayerEnded: function() {
          console.log('VIDEO PLAYER ENDED');
          playNextVideo();
        }
      });
    });
  }

  function playNextVideo() {
    currentVideoID += 1;
    $('#video-player').tubeplayer('play',playlist[currentVideoID]['youtube']);
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
          }
        }
      });
      $('#video-player').css({'width':screenWidth+'px','height':screenHeight+'px'});
      $('#video-player').tubeplayer('size', {
        width: screenWidth, 
        height: screenHeight
      });
      $('#video-player').tubeplayer('quality', 'hd1080');
    });
  }
});