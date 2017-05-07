// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/

https://archive.org/download/Franck_Oeuvres_principales/Le_chasseur_maudit.mp3
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Franck_Oeuvres_principales/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Six pieces pour grand orgue (1862)",
                "length": "1:17:04",
                "file": "Six_Pieces_pour_grand_orgue"
            }, {
                "track": 2,
                "name": "Quintette pour piano, deux violons, alto et violoncelle en fa mineur (1880)",
                "length": "35:06",
                "file": "Piano_quintet_in_f_minor"
            }, {
                "track": 3,
                "name": "Le chasseur maudit (1882)",
                "length": "16:13",
                "file": "Le_chasseur_maudit"
            }, {

                "track": 4,
                "name": "Sonate pour violon et piano (1886)",
                "length": "27:03",
                "file": "Sonate_pour_violon_et_piano"
            }, {
                "track": 5,
                "name": "Prélude, choral et fugue (1884)",
                "length": "18:04",
                "file": "Prelude_Choral_et_Fugue"
            }, {
                "track": 6,
                "name": "Trois_chorals_pour_grand_orgue (1890)",
                "length": "42:41",
                "file": "Trois chorals pour grand orgue"
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
