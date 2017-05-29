// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Chopin_Preludes/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Prélude n°1 en do majeur",
                "length": "0:38",
                "file": "01_Preludes_01"
            }, {
                "track": 2,
                "name": "Prélude n°2 en la mineur",
                "length": "2:19",
                "file": "02_Preludes_02"
            }, {
                "track": 3,
                "name": "Prélude n°3 en sol majeur",
                "length": "0:59",
                "file": "03_Preludes_03"
            }, {
                "track": 4,
                "name": "Prélude n°4 en mi mineur",
                "length": "2:03",
                "file": "04_Preludes_04"
            }, {
                "track": 5,
                "name": "Prélude n°5 en ré majeur",
                "length": "0:38",
                "file": "05_Preludes_05"
            }, {
                "track": 6,
                "name": "Prélude n°6 en si mineur",
                "length": "1:47",
                "file": "06_Preludes_06"
            }, {
                "track": 7,
                "name": "Prélude n°7 en la majeur",
                "length": "0:43",
                "file": "07_Preludes_07"
            }, {
                "track": 8,
                "name": "Prélude n°8 en fa dièse mineur",
                "length": "1:48",
                "file": "08_Preludes_08"
            }, {
                "track": 9,
                "name": "Prélude n°9 en mi majeur",
                "length": "1:16",
                "file": "09_Preludes_09"
            }, {
                "track": 10,
                "name": "Prélude n°10 en do dièse mineur",
                "length": "0:35",
                "file": "10_Preludes_10"
            }, {
                "track": 11,
                "name": "Prélude n°11 en si majeur",
                "length": "0:34",
                "file": "11_Preludes_11"
            }, {
                "track": 12,
                "name": "Prélude n°12 en sol dièse mineur",
                "length": "1:12",
                "file": "12_Preludes_12"
            }, {
                "track": 13,
                "name": "Prélude n°13 en fa dièse majeur",
                "length": "2:38",
                "file": "13_Preludes_13"
            }, {
                "track": 14,
                "name": "Prélude n°14 en mi bémol mineur",
                "length": "0:31",
                "file": "14_Preludes_14"
            }, {
                "track": 15,
                "name": "ré bémol majeur",
                "length": "5:00",
                "file": "15_Preludes_15"
            }, {
                "track": 16,
                "name": "si bémol mineur",
                "length": "1:08",
                "file": "16_Preludes_16"
            }, {
                "track": 17,
                "name": "la bémol majeur",
                "length": "2:49",
                "file": "17_Preludes_17"
            }, {
                "track": 18,
                "name": "Prélude n°18 en fa mineur",
                "length": "0:52",
                "file": "18_Preludes_18"
            }, {
                "track": 19,
                "name": "Prélude n°19 en mi bémol majeur",
                "length": "1:19",
                "file": "19_Preludes_19"
            }, {
                "track": 20,
                "name": "Prélude n°20 en do mineur",
                "length": "1:47",
                "file": "20_Preludes_20"
            }, {
                "track": 21,
                "name": "Prélude n°21 en si bémol majeur",
                "length": "1:41",
                "file": "21_Preludes_21"
            }, {
                "track": 22,
                "name": "Prélude n°22 en sol mineur",
                "length": "0:45",
                "file": "22_Preludes_22"
            }, {
                "track": 23,
                "name": "Prélude n°23 en fa majeur",
                "length": "0:52",
                "file": "23_Preludes_23"
            }, {
                "track": 24,
                "name": "Prélude n°24 en ré mineur",
                "length": "2:24",
                "file": "24_Preludes_24"
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
