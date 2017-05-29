// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Chopin_Mazurkas/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Mazurka n°1 en fa dièse mineur. Opus 6 n°1",
                "length": "3:17",
                "file": "01_Mazurka_01"
            }, {
                "track": 2,
                "name": "Mazurka n°2 en do dièse mineur. Opus 6 n°2",
                "length": "2:30",
                "file": "02_Mazurka_02"
            }, {
                "track": 3,
                "name": "Mazurka n°3 en mi majeur. Opus 6 n°3",
                "length": "2:00",
                "file": "03_Mazurka_03"
            }, {
                "track": 4,
                "name": "Mazurka n°4 en mi bémol mineur. Opus 6 n°4",
                "length": "0:54",
                "file": "04_Mazurka_04"
            }, {
                "track": 5,
                "name": "Mazurka n°5 en si bémol majeur. Opus 7 n°1",
                "length": "2:22",
                "file": "05_Mazurka_05"
            }, {
                "track": 6,
                "name": "Mazurka n°6 en la mineur. Opus 7 n°2",
                "length": "3:18",
                "file": "06_Mazurka_06"
            }, {
                "track": 7,
                "name": "Mazurka n°7 en fa mineur. Opus 7 n°3",
                "length": "2:44",
                "file": "07_Mazurka_07"
            }, {
                "track": 8,
                "name": "Mazurka n°8 en la bémol majeur. Opus 7 n°4",
                "length": "1:13",
                "file": "08_Mazurka_08"
            }, {
                "track": 9,
                "name": "Mazurka n°9 en do majeur. Opus 7 n°5",
                "length": "0:47",
                "file": "09_Mazurka_09"
            }, {
                "track": 10,
                "name": "Mazurka n°10 en si bémol majeur. Opus 17 n°1",
                "length": "2:28",
                "file": "10_Mazurka_10"
            }, {
                "track": 11,
                "name": "Mazurka n°11 en mi mineur. Opus 17 n°2",
                "length": "2:14",
                "file": "11_Mazurka_11"
            }, {
                "track": 12,
                "name": "Mazurka n°12 en la bémol majeur. Opus 17 n°3",
                "length": "4:48",
                "file": "12_Mazurka_12"
            }, {
                "track": 13,
                "name": "Mazurka n°13 en la mineur. Opus 17 n°4",
                "length": "4:11",
                "file": "13_Mazurka_13"
            }, {
                "track": 14,
                "name": "Mazurka n°14 en sol mineur. Opus 24 n°1",
                "length": "2:30",
                "file": "14_Mazurka_14"
            }, {
                "track": 15,
                "name": "Mazurka n°15 en do majeur. Opus 24 n°2",
                "length": "2:13",
                "file": "15_Mazurka_15"
            }, {
                "track": 16,
                "name": "Mazurka n°16 en la bémol majeur. Opus 24 n°3",
                "length": "2:20",
                "file": "16_Mazurka_16"
            }, {
                "track": 17,
                "name": "Mazurka n°17 en si bémol mineur. Opus 24 n°4",
                "length": "4:36",
                "file": "17_Mazurka_17"
            }, {
                "track": 18,
                "name": "Mazurka n°18 en do mineur. Opus 30 n°1",
                "length": "1:36",
                "file": "18_Mazurka_18"
            }, {
                "track": 19,
                "name": "Mazurka n°19 en si mineur. Opus 30 n°2",
                "length": "1:17",
                "file": "19_Mazurka_19"
            }, {
                "track": 20,
                "name": "Mazurka n°20 en ré bémol majeur. Opus 30 n°3",
                "length": "3:06",
                "file": "20_Mazurka_20"
            }, {
                "track": 21,
                "name": "Mazurka n°21 en do dièse mineur. Opus 30 n°4",
                "length": "4:06",
                "file": "21_Mazurka_21"
            }, {
                "track": 22,
                "name": "Mazurka n°22 en sol dièse mineur. Opus 33 n°31",
                "length": "1:41",
                "file": "22_Mazurka_22"
            }, {
                "track": 23,
                "name": "Mazurka n°23 en ré majeur. Opus 33 n°2",
                "length": "2:33",
                "file": "23_Mazurka_23"
            }, {
                "track": 24,
                "name": "Mazurka n°24 en do majeur. Opus 33 n°3",
                "length": "1:20",
                "file": "24_Mazurka_24"
            }, {
                "track": 25,
                "name": "Mazurka n°25 en si mineur. Opus 33 n°4",
                "length": "5:45",
                "file": "25_Mazurka_25"
            }, {
                "track": 26,
                "name": "Mazurka n°26 en do dièse majeur. Opus 41 n°1",
                "length": "4:17",
                "file": "26_Mazurka_26"
            }, {
                "track": 27,
                "name": "Mazurka n°27 en mi mineur. Opus 41 n°2",
                "length": "2:25",
                "file": "27_Mazurka_27"
            }, {
                "track": 28,
                "name": "Mazurka n°28 en si majeur. Opus 41 n°3",
                "length": "1:23",
                "file": "28_Mazurka_28"
            }, {
                "track": 29,
                "name": "Mazurka n°29 en la bémol mineur. Opus 41 n°4",
                "length": "2:34",
                "file": "29_Mazurka_29"
            }, {
                "track": 30,
                "name": "Mazurka n°30 en sol majeur. Opus 50 n°1",
                "length": "3:06",
                "file": "20_Mazurka_20"
            }, {
                "track": 31,
                "name": "Mazurka n°31 en la bémol majeur. Opus 50 n°2",
                "length": "3:49",
                "file": "31_Mazurka_31"
            }, {
                "track": 32,
                "name": "Mazurka n°32 en do dièse mineur. Opus 50 n°3",
                "length": "5:20",
                "file": "32_Mazurka_32"
            }, {
                "track": 33,
                "name": "Mazurka n°33 en si majeur. Opus 56 n°1",
                "length": "4:49",
                "file": "33_Mazurka_33"
            }, {
                "track": 34,
                "name": "Mazurka n°34 en do majeur. Opus 56 n°2",
                "length": "1:41",
                "file": "34_Mazurka_34"
            }, {
                "track": 35,
                "name": "Mazurka n°35 en do mineur. Opus 56 n°3",
                "length": "6:43",
                "file": "35_Mazurka_35"
            }, {
                "track": 36,
                "name": "Mazurka n°36 en la mineur. Opus 59 n°1",
                "length": "4:14",
                "file": "36_Mazurka_36"
            }, {
                "track": 37,
                "name": "Mazurka n°37 en la bémol majeur. Opus 59 n°2",
                "length": "3:00",
                "file": "37_Mazurka_37"
            }, {
                "track": 38,
                "name": "Mazurka n°38 en fa dièse mineur. Opus 59 n°3",
                "length": "3:39",
                "file": "38_Mazurka_38"
            }, {
                "track": 39,
                "name": "Mazurka n°39 en si majeur. Opus 63 n°1",
                "length": "2:43",
                "file": "39_Mazurka_39"
            }, {
                "track": 40,
                "name": "Mazurka n°40 en fa mineur. Opus 63 n°2",
                "length": "1:48",
                "file": "40_Mazurka_40"
            }, {
                "track": 41,
                "name": "Mazurka n°41 en do dièse mineur. Opus 63 n°3",
                "length": "2:26",
                "file": "41_Mazurka_41"
            }, {
                "track": 42,
                "name": "Mazurka n°42 en la mineur. Opus Posthum",
                "length": "3:48",
                "file": "42_Mazurka_42"
            }, {
                "track": 43,
                "name": "Mazurka n°43 en la mineur. Opus Posthum",
                "length": "4:02",
                "file": "43_Mazurka_43"
            }, {
                "track": 44,
                "name": "Mazurka n°44 en sol majeur. Opus 67 n°1",
                "length": "1:20",
                "file": "44_Mazurka_44"
            }, {
                "track": 45,
                "name": "Mazurka n°45 en sol mineur. Opus 67 n°2",
                "length": "2:20",
                "file": "45_Mazurka_45"
            }, {
                "track": 46,
                "name": "Mazurka n°46 en do majeur. Opus 67 n°3",
                "length": "1:30",
                "file": "46_Mazurka_46"
            }, {
                "track": 47,
                "name": "Mazurka n°47 en la mineur. Opus 67 n°4",
                "length": "2:53",
                "file": "47_Mazurka_47"
            }, {
                "track": 48,
                "name": "Mazurka n°48 en do majeur. Opus 68 n°1",
                "length": "1:40",
                "file": "48_Mazurka_48"
            }, {
                "track": 49,
                "name": "Mazurka n°49 en la mineur. Opus 68 n°2",
                "length": "2:46",
                "file": "49_Mazurka_49"
            }, {
                "track": 50,
                "name": "Mazurka n°50 en fa majeur. Opus 68 n°3",
                "length": "1:50",
                "file": "50_Mazurka_50"
            }, {
                "track": 51,
                "name": "Mazurka n°51 en fa mineur. Opus 68 n°4",
                "length": "1:56",
                "file": "51_Mazurka_51"
            }, {
                "track": 52,
                "name": "Mazurka n°52 en si bémol majeur. Opus Posthum",
                "length": "34",
                "file": "52_Mazurka_52"
            }, {
                "track": 53,
                "name": "Mazurka n°53 en sol majeur. Opus Posthum",
                "length": "1:44",
                "file": "53_Mazurka_53"
            }, {
                "track": 54,
                "name": "Mazurka n°54 en ré majeur. Opus Posthum",
                "length": "1:25",
                "file": "54_Mazurka_54"
            }, {
                "track": 55,
                "name": "Mazurka n°55 en ré majeur. Opus Posthum",
                "length": "1:48",
                "file": "55_Mazurka_55"
            }, {
                "track": 56,
                "name": "Mazurka n°56 en si bémol majeur. Opus Posthum",
                "length": "1:34",
                "file": "56_Mazurka_56"
            }, {
                "track": 57,
                "name": "Mazurka n°57 en do majeur. Opus Posthum",
                "length": "3:19",
                "file": "57_Mazurka_57"
            }, {
                "track": 58,
                "name": "Mazurka n°58 en la bémol majeur. Opus Posthum",
                "length": "1:48",
                "file": "58_Mazurka_58"
            }, {
                "track": 59,
                "name": "Mazurek Dabrowskiego",
                "length": "1:42",
                "file": "59_Mazurka_59"
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
