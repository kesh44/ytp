var p;

function get_id_from_url(url)
{
  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match&&match[1].length==11)? match[1] : false;
}

document.getElementById('youtubelink').addEventListener('input', (e) => {
  var re = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if(e.target.value.match(re))
  {
    p = new YT.Player('player', {
      height: '1080',
      width: '1920',
      videoId: get_id_from_url(e.target.value),
      playerVars: {
        'controls' : 1,
        'rel' : 0,
        'fs' : 0
      },
      events: {
        onReady: e => set_up(e),
      }
    });
  }
});

function set_up(e){
  e.target.playVideo()
  update_pp()
}

function update_pp(){
  if (p.getPlayerState() === 1) {
    $('#pause').hide()
    $('#play').show()
  } else {
    $('#play').hide()
    $('#pause').show()
  }
}

document.getElementById('fs').addEventListener('click', () => {
  if (document.fullscreenElement != null){
    document.exitFullscreen()
  }

  var element = document.body;
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

if (requestMethod) { // Native full screen.
  requestMethod.call(element);
} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
  var wscript = new ActiveXObject("WScript.Shell");
  if (wscript !== null) {
    wscript.SendKeys("{F11}");
  }
}
});

document.getElementById('pp').addEventListener('click', () => {
  if (p)
  {
    if (p.getPlayerState() === 1) {
      p.pauseVideo()
      update_pp()
    } else {
      p.playVideo()
      update_pp()
    }
  }
});

document.getElementById('back5').addEventListener('click', () => {
  if (p) {
    p.seekTo(p.getCurrentTime() - 5)
  }
});

document.getElementById('back10').addEventListener('click', () => {
  if (p) {
    p.seekTo(p.getCurrentTime() - 10)
  }
});

document.getElementById('faster').addEventListener('click', () => {
  if (p)
  {
    var available_rates = p.getAvailablePlaybackRates()
    var currentIndex = available_rates.indexOf(p.getPlaybackRate());

    if(currentIndex + 1 < available_rates.length)
    {
      _setplaybackrate(available_rates[currentIndex + 1])
    } 
  }
});

document.getElementById('slower').addEventListener('click', () => {
  if (p)
  {      
    var available_rates = p.getAvailablePlaybackRates()
    var currentIndex = available_rates.indexOf(p.getPlaybackRate());

    if(currentIndex > 0)
    {
      _setplaybackrate(available_rates[currentIndex - 1])
    } 
  }
});

document.getElementById('go').addEventListener('click', () => {
  var min = parseInt($("#min").val())
  var sec = parseInt($("#sec").val())

  if (min) {
    var total = min*60 + sec
  } else {
    var total = sec
  }

  console.log(total)

  if (p) {
    p.seekTo(total)
  }
});

document.getElementById('min').addEventListener('keypress', () => {
  var marker = $("#set").val()
  if (marker > 0) {p.seekTo(marker)}
});

function _setplaybackrate(rate)
{
  p.setPlaybackRate(rate)
  $('#speed').text((Math.round(rate * 100) / 100).toFixed(2));
}

// demo mode baby
// window.YT.ready(function() {
//   p = new YT.Player('player', {
//     height: '450',
//     width: '800',
//     videoId: 'XO5J6vJYkEM',
//     playerVars: {
//       'controls' : 1,
//       'modestbranding' : 1,
//       'rel' : 0,
//       'fs' : 0
//     },
//     events: {}
//   })
// });