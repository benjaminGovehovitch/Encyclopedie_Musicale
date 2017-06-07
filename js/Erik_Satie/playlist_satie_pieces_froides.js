// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Satie_Pieces_froides/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "I - Airs à faire fuir - D'une manière très particulière",
                "length": "3:42",
                "file": "01_Airs_a_faire_fuir_01_D_une_maniere_tres_particuliere"
	    },{
                "track": 2,
                "name": "I - Airs à faire fuir - Modestement",
                "length": "1:52",
                "file": "01_Airs_a_faire_fuir_02_ Modestement"
	    },{
                "track": 3,
                "name": "I - Airs à faire fuir - S'inviter",
                "length": "3:49",
                "file": "01_Airs_a_faire_fuir_03_S_inviter"
	    },{
                "track": 4,
                "name": "II - Danses de travers - En y regardant à deux fois",
                "length": "1:44",
                "file": "02_Danses_de_travers_01_En_y_regardant_a_deux_fois"
	    },{
                "track": 5,
                "name": "II - Danses de travers - Passer",
                "length": "1:28",
                "file": "02_Danses_de_travers_02_Passer"
	    },{
                "track": 6,
                "name": "II - Danses de travers - Encore",
                "length": "2:25",
                "file": "02_Danses_de_travers_03_Encore"
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
