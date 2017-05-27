// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Beethoven_Variations_diabelli/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Thème : Vivace",
                "length": "0:58",
                "file": "01_Theme"
            }, {
                "track": 2,
                "name": "Variation 1 : Alla marcia maestoso",
                "length": "2:28",
                "file": "02_Variation_1"
            }, {
                "track": 3,
                "name": "Variation 2 : Poco allegro",
                "length": "0:54",
                "file": "03_Variation_2"
            }, {
                "track": 4,
                "name": "Variation 3 : L’istesso tempo",
                "length": "1:53",
                "file": "04_Variation_3"
            }, {
                "track": 5,
                "name": "Variation 4 : Un poco più vivace",
                "length": "1:26",
                "file": "05_Variation_4"
            }, {
                "track": 6,
                "name": "Variation 5 : Allegro vivace",
                "length": "1:15",
                "file": "06_Variation_5"
            }, {
                "track": 7,
                "name": "Variation 6 : Allegro ma non troppo e serioso",
                "length": "1:44",
                "file": "07_Variation_6"
            }, {
                "track": 8,
                "name": "Variation 7 : Un poco più allegro",
                "length": "1:07",
                "file": "08_Variation_7"
            }, {
                "track": 9,
                "name": "Variation 8 : Poco vivace",
                "length": "1:41",
                "file": "09_Variation_8"
            }, {
                "track": 10,
                "name": "Variation 9 : Allegro pesante e risoluto",
                "length": "2:20",
                "file": "10_Variation_9"
            }, {
                "track": 11,
                "name": "Variation 10 : Presto",
                "length": "0:32",
                "file": "11_Variation_10"
            }, {
                "track": 12,
                "name": "Variation 11 : Allegretto",
                "length": "1:20",
                "file": "12_Variation_11"
            }, {
                "track": 13,
                "name": "Variation 12 : Un poco più moto",
                "length": "0:48",
                "file": "13_Variation_12"
            }, {
                "track": 14,
                "name": "Variation 13 : Vivace",
                "length": "1:12",
                "file": "14_Variation_13"
            }, {
                "track": 15,
                "name": "Variation 14 : Grave e maestoso",
                "length": "4:30",
                "file": "15_Variation_14"
            }, {
                "track": 16,
                "name": "Variation 15 : Presto scherzando",
                "length": "0:38",
                "file": "16_Variation_15"
            }, {
                "track": 17,
                "name": "Variations 16 et 17 : Allegro - Allegro",
                "length": "1:57",
                "file": "17_Variations_16_17"
            }, {
                "track": 18,
                "name": "Variation 18 : Poco moderato",
                "length": "1:59",
                "file": "18_Variations_18"
            }, {
                "track": 19,
                "name": "Variation 19 : Presto",
                "length": "0:46",
                "file": "19_Variations_19"
            }, {
                "track": 20,
                "name": "Variation 20 : Andante",
                "length": "2:39",
                "file": "20_Variations_20"
            }, {
                "track": 21,
                "name": "Variation 21 : Allegro con brio – Meno allegro – Tempo primo",
                "length": "1:22",
                "file": "21_Variations_21"
            }, {
                "track": 22,
                "name": "Variation 22 : Allegro molto, alla ‘Notte e giorno faticar’ di Mozart",
                "length": "0:45",
                "file": "22_Variations_22"
            }, {
                "track": 23,
                "name": "Variation 23 : Allegro assai",
                "length": "0:56",
                "file": "23_Variations_23"
            }, {
                "track": 24,
                "name": "Variation 24 : Fughetta (Andante)",
                "length": "3:09",
                "file": "24_Variation_24"
            }, {
                "track": 25,
                "name": "Variation 25 : Allegro",
                "length": "1:01",
                "file": "25_Variation_25"
            }, {
                "track": 26,
                "name": "Variation 26 : Piacevole",
                "length": "1:14",
                "file": "26_Variation_26"
            }, {
                "track": 27,
                "name": "Variation 27 : Vivace",
                "length": "0:56",
                "file": "27_Variation_27"
            }, {
                "track": 28,
                "name": "Variation 28 : Allegro",
                "length": "0:53",
                "file": "28_Variation_28"
            }, {
                "track": 29,
                "name": "Variation 29 : Adagio ma non troppo",
                "length": "1:16",
                "file": "29_Variation_29"
            }, {
                "track": 30,
                "name": "Variation 30 : Andante, sempre cantabile",
                "length": "2:03",
                "file": "30_Variation_30"
            }, {
                "track": 31,
                "name": "Variation 31 : Largo, molto espressivo",
                "length": "5:41",
                "file": "31_Variation_31"
            }, {
                "track": 32,
                "name": "Variation 32 : Fuga : Allegro",
                "length": "3:35",
                "file": "32_Variation_32"
            }, {
                "track": 33,
                "name": "Variation 33 : Tempo di Menuetto moderato",
                "length": "4:46",
                "file": "33_Variation_33"
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
