// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Chopin_Nocturnes/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Nocturne 1 en si bémol mineur. Opus 9 n°1",
                "length": "5:45",
                "file": "01_Nocturne_01"
            }, {
                "track": 2,
                "name": "Nocturne 2 en mi bémol majeur. Opus 9 n°2",
                "length": "4:42",
                "file": "02_Nocturne_02"
            }, {
                "track": 3,
                "name": "Nocturne 3 en si majeur. Opus 9 n°3",
                "length": "6:39",
                "file": "03_Nocturne_03"
            }, {
                "track": 4,
                "name": "Nocturne 4 fa majeur. Opus 15 n°1",
                "length": "4:56",
                "file": "04_Nocturne_04"
            }, {
                "track": 5,
                "name": "Nocturne 5 en fa dièse majeur. Opus 15 n°2",
                "length": "3:38",
                "file": "05_Nocturnes_05"
            }, {
                "track": 6,
                "name": "Nocturne 6 sol mineur. Opus 15 n°3",
                "length": "5:08",
                "file": "06_Nocturne_06"
            }, {
                "track": 7,
                "name": "Nocturne 7 do dièse mineur. Opus 27 n°1",
                "length": "5:41",
                "file": "07_Nocturne_07"
            }, {
                "track": 8,
                "name": "Nocturne 8 en ré bémol majeur. Opus 27 n°2",
                "length": "5:53",
                "file": "08_Nocturne_08"
            }, {
                "track": 9,
                "name": "Nocturne 9 en si majeur. Opus 32 n°1",
                "length": "4:58",
                "file": "09_Nocturne_09"
            }, {
                "track": 10,
                "name": "Nocturne 10 en la bémol majeur. Opus 32 n°2",
                "length": "5:34",
                "file": "10_Nocturne_10"
            }, {
                "track": 11,
                "name": "Nocturne 11 en sol mineur. Opus 37 n°1",
                "length": "6:49",
                "file": "11_Nocturne_11"
            }, {
                "track": 12,
                "name": "Nocturne 12 en sol majeur. Opus 37 n°2",
                "length": "6:27",
                "file": "12_Nocturne_12"
            }, {
                "track": 13,
                "name": "Nocturne 13 en do mineur. Opus 48 n°1",
                "length": "6:10",
                "file": "13_Nocturne_13"
            }, {
                "track": 14,
                "name": "Nocturne 14 en fa dièse mineur. Opus 48 n°2",
                "length": "7:45",
                "file": "14_Nocturne_14"
            }, {
                "track": 15,
                "name": "Nocturne 15 en fa mineur. Opus 55 n°1",
                "length": "5:25",
                "file": "15_Nocturne_15"
            }, {
                "track": 16,
                "name": "Nocturne 16 en mi bémol majeur. Opus 55 n°2",
                "length": "5:45",
                "file": "16_Nocturne_16"
            }, {
                "track": 17,
                "name": "Nocturne 17 en si majeur. Opus 62 n°1",
                "length": "7:30",
                "file": "17_Nocturne_17"
            }, {
                "track": 18,
                "name": "Nocturne 18 en mi majeur. Opus 62 n°2",
                "length": "6:15",
                "file": "18_Nocturne_18"
            }, {
                "track": 19,
                "name": "Nocturne 19 en mi mineur. Opus 72",
                "length": "4:10",
                "file": "19_Nocturne_19"
            }, {
                "track": 20,
                "name": "Nocturne 20 en do dièse mineur. Opus P 1 n°16",
                "length": "4:05",
                "file": "20_Nocturne_20"
            }, {
                "track": 21,
                "name": "Nocturne 21 en do mineur P 2 n°8",
                "length": "3:02",
                "file": "21_Nocturne_21"
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
