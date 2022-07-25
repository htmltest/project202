$(document).ready(function() {

    var audioEl = $('audio')[0];
    var maxTime = 0;
    var curTime = 0;

    var isPlaying = false;

    audioEl.onloadedmetadata = function() {
        maxTime = audioEl.duration;
    }

    audioEl.ontimeupdate = function() {
        maxTime = audioEl.duration;

        var sec_num = audioEl.currentTime;
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        seconds = Math.round(seconds);

        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        $('.play-time').html(minutes + ':' + seconds);

        if (isPlaying) {
            curTime = audioEl.currentTime;
        }

        $('.audio-progress-current').css({'width': (curTime / maxTime * 100) + '%'});
    }

    audioEl.onended = function() {
        audioEl.currentTime = 0;
        audioEl.pause();
        isPlaying = false;
        $('.audio').removeClass('playing');
        $('.audio-progress-current').css({'width': '0%'});
    }

    $('.play-btn').click(function() {
        if (isPlaying) {
            audioEl.pause();
            isPlaying = false;
            $('.audio').removeClass('playing');
        } else {
            audioEl.play();
            isPlaying = true;
            $('.audio').addClass('playing');
        }
    });

    $('.audio-progress').click(function(e) {
        var curPos = (e.pageX - $('.audio-progress').offset().left) / $('.audio-progress').width() * maxTime;
        audioEl.currentTime = curPos;
        audioEl.play();
        isPlaying = true;
        $('.audio').addClass('playing');
    });

});