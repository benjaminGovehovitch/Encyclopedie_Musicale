// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Satie_Parade_Orchestre/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Choral",
                "length": "1:04",
                "file": "01_Choral"
	    },{
                "track": 2,
                "name": "Prélude du rideau rouge",
                "length": "0:50",
                "file": "02_Prelude_du_rideau_rouge"
	    },{
                "track": 3,
                "name": "Prestidigitateur chinois",
                "length": "3:43",
                "file": "03_Prestidigitateur_chinois"
	    },{
                "track": 4,
                "name": "Petite fille américaine",
                "length": "1:30",
                "file": "04_Petite_fille_americaine"
	    },{
                "track": 5,
                "name": "Rag-time du paquebot",
                "length": "2:13",
                "file": "05_Rag_time_du_paquebot"
	    },{
                "track": 6,
                "name": "Acrobates",
                "length": "3:33",
                "file": "06_Acrobates"
	    },{
                "track": 7,
                "name": "Final",
                "length": "2:10",
                "file": "07_Final"
	    },{
                "track": 8,
                "name": "Suite au prélude du rideau rouge",
                "length": "0:33",
                "file": "08_Suite_au_prelude_du_rideau_rouge"
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
