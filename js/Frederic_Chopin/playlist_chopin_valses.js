// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Chopin_Valses/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Grande valse brillante en mi bémol majeur. Op. 18",
                "length": "6:08",
                "file": "01_Op_18_Grande_Valse_Brillante_E_flat_major"
            }, {
                "track": 2,
                "name": "Grande Valse brillante en la bémol majeur. Op. 34 n°1",
                "length": "6:01",
                "file": "02_Op_34_1_A_flat_major"
            }, {
                "track": 3,
                "name": "Grande Valse brillante en la mineur. Op. 34 n°2",
                "length": "6:27",
                "file": "03_Op_34_2_A_minor"
            }, {
                "track": 4,
                "name": "Grande Valse brillante en fa majeur. Op. 34 n°3",
                "length": "2:39",
                "file": "04_Op_34_3_F_major"
            }, {
                "track": 5,
                "name": "Grande Valse nouvelle en la bémol majeur. Op. 42",
                "length": "4:09",
                "file": "05_Op_42_Grande_valse_A_flat_major"
            }, {
                "track": 6,
                "name": "Valse minute en ré bémol majeur. Op. 64 n°1 ",
                "length": "2:02",
                "file": "06_Op_64_1_D_flat_major"
            }, {
                "track": 7,
                "name": "Valse en ut dièse mineur. Op. 64 n°2 ",
                "length": "3:57",
                "file": "07_Op_64_2_C_sharp_minor"
            }, {
                "track": 8,
                "name": "Valse en la bémol majeur. Op. 64 n°3",
                "length": "3:27",
                "file": "08_Op_64_3_A_flat_major"
            }, {
                "track": 9,
                "name": "Valse de l'adieu en la bémol majeur. Op. Posthume 69 n°1",
                "length": "3:51",
                "file": "09_Op_Post_69_1_A_flat_major"
            }, {
                "track": 10,
                "name": "Valse en si mineur. Op. Posthume 69 n°2",
                "length": "3:38",
                "file": "10_Op_Post_69_2_B_minor"
            }, {
                "track": 11,
                "name": "Valse en sol bémol majeur. Op. Posthume 70",
                "length": "2:20",
                "file": "11_Op_Post_70_1_G_flat_major"
            }, {
                "track": 12,
                "name": "Valse en fa mineur, dédicacée à Élise Gavard",
                "length": "1:45",
                "file": "12_Op_Post_70_2_F_minor"
            }, {
                "track": 13,
                "name": "Valse en ré bémol majeur",
                "length": "2:33",
                "file": "13_Op_Post_70_3_D_flat_major"
            }, {
                "track": 14,
                "name": "Valse en mi mineur. Op. posthume",
                "length": "3:01",
                "file": "14_KKIVa_14_E_minor"
            }, {
                "track": 15,
                "name": "Valse en la bémol majeur. Op. posthume",
                "length": "1:30",
                "file": "15_KKIVa_13_A_flat_major"
            }, {
                "track": 16,
                "name": "Valse en mi majeur. Op. posthume",
                "length": "2:26",
                "file": "16_KKIVa_12_E_major"
            }, {
                "track": 17,
                "name": "Valse en mi bémol majeur n°1. Op. posthume",
                "length": "2:00",
                "file": "17_KKIVa_14_E_flat_major"
            }, {
                "track": 18,
                "name": "Valse en mi bémol majeur n°2. Op. posthume",
                "length": "2:24",
                "file": "18_KKIVb_10_E_flat_major"
            }, {
                "track": 19,
                "name": "Valse en la mineur. Op. posthume",
                "length": "1:54",
                "file": "18_KKIVb_11_a_moll"
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
