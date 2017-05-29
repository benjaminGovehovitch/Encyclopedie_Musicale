// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Chopin_Polonaises/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Polonaise n°1 en do dièse mineur. Opus 26 n°1. Allegro appasionato",
                "length": "8:25",
                "file": "01_Polonaise_op_26_1"
            }, {
                "track": 2,
                "name": "Polonaise n°2 en mi bémol mineur. Opus 9 n°2. Maestoso",
                "length": "8:37",
                "file": "02_Polonaise_op_26_2"
            }, {
                "track": 3,
                "name": "Polonaise n°3 en la majeur. Opus 40 n°1. Allegro con brio",
                "length": "5:28",
                "file": "03_Polonaise_op_40_1"
            }, {
                "track": 4,
                "name": "Polonaise n°4 en do mineur. Opus 40 n°2. Allegro maestoso",
                "length": "8:05",
                "file": "04_Polonaise_op_40_2"
            }, {
                "track": 5,
                "name": "Polonaise n°5 en fa dièse mineur. Opus 44. Tempo di polacca - doppio movimento Tempo di Mazurka - Tempo I",
                "length": "10:56",
                "file": "05_Polonaise_op_44"
            }, {
                "track": 6,
                "name": "Polonaise n°6 en la bémol majeur. Opus 53. Maestoso",
                "length": "7:09",
                "file": "06_Polonaise_op_53"
            }, {
                "track": 7,
                "name": "Polonaise - Fantaisie n°7 en la bémol majeur. Opus 61",
                "length": "13:16",
                "file": "07_Polonaise_op_61"
            }, {
                "track": 8,
                "name": "Andante spianato en sol majeur. Opus 22 n°1",
                "length": "4:55",
                "file": "08_Polonaise_Andante_spaniato_op_22_1"
            }, {
                "track": 9,
                "name": 'Polonaise n°9 "Grande polonaise brilante en mi bémol majeur. Opus 22 n°2',
                "length": "8:33",
                "file": "09_Polonaise_Grande_polonaise_op_22_2"
            }, {
                "track": 10,
                "name": "Polonaise n°10 en ré mineur. Opus 71 n°1",
                "length": "5:48",
                "file": "10_Polonaise_op_71_1"
            }, {
                "track": 11,
                "name": "Polonaise n°11 en si bémol majeur. Opus 71 n°2",
                "length": "7:58",
                "file": "11_Polonaise_op_71_2"
            }, {
                "track": 12,
                "name": "Polonaise n°12 en fa mineur. Opus 71 n°3",
                "length": "6:26",
                "file": "12_Polonaise_op_71_3"
            }, {
                "track": 13,
                "name": "Polonaise n°13 en si bémol mineur. Opus Posthum",
                "length": "6:35",
                "file": "13_Polonaise_op_post"
            }, {
                "track": 14,
                "name": "Polonaise n°14 en sol bémol majeur. Opus Posthum",
                "length": "8:18",
                "file": "14_Polonaise_op_post"
            }, {
                "track": 15,
                "name": "Polonaise n°15 en sol mineur",
                "length": "3:31",
                "file": "15_Polonaise_KK_889"
            }, {
                "track": 16,
                "name": "Polonaise n°16 en si bémol majeur. Opus Posthum",
                "length": "3:20",
                "file": "16_Polonaise_op_post"
            }, {
                "track": 17,
                "name": "Polonaise n°17 en la bémol majeur. Opus Posthum",
                "length": "4:00",
                "file": "17_Polonaise_op_post"
            }, {
                "track": 18,
                "name": "Polonaise n°18 en sol dièse mineur. Opus Posthum",
                "length": "6:59",
                "file": "18_Polonaise_op_post"
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
