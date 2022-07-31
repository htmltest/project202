$(document).ready(function() {

    $('audio').each(function() {

        var audioEl = this;
        var curAudio = $(this).parent();

        curAudio.data('isPlaying', false);

        audioEl.ontimeupdate = function() {
            var maxTime = audioEl.duration;
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
            curAudio.find('.play-time').html(minutes + ':' + seconds);

            if (curAudio.data('isPlaying')) {
                curTime = audioEl.currentTime;
            }

            curAudio.find('.audio-progress-current').css({'width': (curTime / maxTime * 100) + '%'});
        }

        audioEl.onended = function() {
            audioEl.currentTime = 0;
            audioEl.pause();
            curAudio.data('isPlaying', false);
            curAudio.removeClass('playing');
            curAudio.find('.audio-progress-current').css({'width': '0%'});
        }

        curAudio.find('.play-btn').click(function() {
            if (curAudio.data('isPlaying')) {
                audioEl.pause();
                curAudio.data('isPlaying', false);
                curAudio.removeClass('playing');
            } else {
                stopAllAudio();
                audioEl.play();
                curAudio.data('isPlaying', true);
                curAudio.addClass('playing');
            }
        });

        curAudio.find('.audio-progress').click(function(e) {
            stopAllAudio();
            var maxTime = audioEl.duration;
            var curPos = (e.pageX - curAudio.find('.audio-progress').offset().left) / curAudio.find('.audio-progress').width() * maxTime;
            audioEl.currentTime = curPos;
            audioEl.play();
            curAudio.data('isPlaying', true);
            curAudio.addClass('playing');
        });

    });

    $('.collection-name').click(function() {
        $(this).parent().toggleClass('open');
    });

});

function stopAllAudio() {
    $('audio').each(function() {
        var audioEl = this;
        var curAudio = $(this).parent();

        audioEl.pause();
        curAudio.data('isPlaying', false);
        curAudio.removeClass('playing');
    });
}