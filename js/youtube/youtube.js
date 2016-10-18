var windowSizeWidth = $(window).width();
var higerYoutube = windowSizeWidth / 1.77;


// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: higerYoutube,
          width: windowSizeWidth,
          videoId: 'YYDqpgA6kTA',
          playerVars: { 'autoplay':1, 'controls':0, 'showinfo':0, 'rel':0, 'autohide':0, 'loop':1, 'playlist': 'YYDqpgA6kTA' },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.setVolume(0);
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          /*setTimeout(stopVideo, 33000);*/
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }

$(document).ready(function(){
$('#player > .video-stream').attr('id', 'removeStyle');
/*$(this).css({'width' : windowSize, 'height' : 'auto','left' : '0', 'top' : '-41px' });*/
});

