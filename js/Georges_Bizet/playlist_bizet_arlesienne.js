// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Bizet_Arlesienne/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Prélude",
                "length": "10:22",
                "file": "01_Prelude"
            }, {
                "track": 2,
                "name": "Menuet",
                "length": "9:37",
                "file": "02_Menuet"
            }, {
                "track": 3,
                "name": "Adagietto",
                "length": "5:55",
                "file": "03_Adagietto"
            }, {
                "track": 4,
                "name": "Carillon",
                "length": "5:55",
                "file": "04_Carillon"
            }, {
                "track": 5,
                "name": "Pastorale",
                "length": "5:55",
                "file": "01_Pastorale"
            }, {
                "track": 6,
                "name": "Intermezzo",
                "length": "5:55",
                "file": "02_Intermezzo"
            }, {
                "track": 7,
                "name": "Minuet",
                "length": "5:55",
                "file": "03_Minuet"
            }, {
                "track": 8,
                "name": "Farandole",
                "length": "8:43",
                "file": "04_Farandole"
            },],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Lecture');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Pause');
            }).bind('ended', function () {
                npAction.text('Pause');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});
