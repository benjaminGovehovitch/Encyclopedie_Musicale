// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Chopin_Etudes/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Étude n°1 en do majeur. Opus n°10",
                "length": "1:53",
                "file": "01_Etude_01"
            }, {
                "track": 2,
                "name": "Étude n°2 en la mineur. Opus n°10",
                "length": "1:23",
                "file": "02_Etude_02"
            }, {
                "track": 3,
                "name": "Étude n°3 en mi majeur. Opus n°10",
                "length": "4:46",
                "file": "03_Etude_03"
            }, {
                "track": 4,
                "name": "Étude n°4 en do dièse majeur. Opus n°10",
                "length": "2:00",
                "file": "04_Etude_04"
            }, {
                "track": 5,
                "name": "Étude n°5 en sol bémol majeur. Opus n°10",
                "length": "1:42",
                "file": "05_Etude_05"
            }, {
                "track": 6,
                "name": "Étude n°6 en mi bémol mineur. Opus n°10",
                "length": "4:38",
                "file": "06_Etude_06"
            }, {
                "track": 7,
                "name": "Étude n°7 en do majeur. Opus n°10",
                "length": "1:29",
                "file": "07_Etude_07"
            }, {
                "track": 8,
                "name": "Étude n°8 en fa majeur. Opus n°10",
                "length": "2:18",
                "file": "08_Etude_08"
            }, {
                "track": 9,
                "name": "Étude n°9 en fa mineur. Opus n°10",
                "length": "2:41",
                "file": "09_Etude_09"
            }, {
                "track": 10,
                "name": "Étude n°10 en la bémol majeur. Opus n°10",
                "length": "2:16",
                "file": "10_Etude_10"
            }, {
                "track": 11,
                "name": "Étude n°11 en mi bémol majeur. Opus n°10",
                "length": "2:54",
                "file": "11_Etude_11"
            }, {
                "track": 12,
                "name": "Étude n°12 en do mineur. Opus n°10",
                "length": "2:46",
                "file": "12_Etude_12"
            }, {
                "track": 13,
                "name": "Étude n°1 en la bémol majeur. Opus n°25",
                "length": "3:14",
                "file": "13_Etude_13"
            }, {
                "track": 14,
                "name": "Étude n°2 en fa mineur. Opus n°25",
                "length": "1:38",
                "file": "14_Etude_14"
            }, {
                "track": 15,
                "name": "Étude n°3 en fa majeur. Opus n°25",
                "length": "1:45",
                "file": "15_Etude_15"
            }, {
                "track": 16,
                "name": "Étude n°4 en la mineur. Opus n°25",
                "length": "1:32",
                "file": "16_Etude_16"
            }, {
                "track": 17,
                "name": "Étude n°5 en mi mineur. Opus n°25",
                "length": "3:20",
                "file": "17_Etude_17"
            }, {
                "track": 18,
                "name": "Étude n°6 en sol dièse mineur. Opus n°25",
                "length": "2:00",
                "file": "18_Etude_18"
            }, {
                "track": 19,
                "name": "Étude n°7 en do dièse mineur. Opus n°25",
                "length": "5:46",
                "file": "19_Etude_19"
            }, {
                "track": 20,
                "name": "Étude n°8 en ré bémol majeur. Opus n°25",
                "length": "1:05",
                "file": "20_Etude_20"
            }, {
                "track": 21,
                "name": "Étude n°9 en sol bémol majeur. Opus n°25",
                "length": "0:59",
                "file": "21_Etude_21"
            }, {
                "track": 22,
                "name": "Étude n°10 en si mineur. Opus n°25",
                "length": "4:10",
                "file": "22_Etude_22"
            }, {
                "track": 23,
                "name": "Étude n°11 en la mineur. Opus n°25",
                "length": "3:38",
                "file": "23_Etude_23"
            }, {
                "track": 24,
                "name": "Étude n°12 en do mineur. Opus n°25",
                "length": "2:38",
                "file": "24_Etude_24"
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
