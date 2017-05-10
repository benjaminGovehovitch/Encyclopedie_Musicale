// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Satie_Sports_et_divertissements/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Chorale inapétissant",
                "length": "13:59",
                "file": "01_Chorale_inapetissant"
            }, {
                "track": 2,
                "name": "Le yachting",
                "length": "6:26",
                "file": "02_Le_yachting"
            }, {
                "track": 3,
                "name": "Le traineau",
                "length": "15:00",
                "file": "03_Le_traineau"
            }, {
                "track": 4,
                "name": "Le tango",
                "length": "4:29",
                "file": "04_Le_tango"
            }, {
                "track": 5,
                "name": "Le carnaval",
                "length": "9:17",
                "file": "05_Le_carnaval"
            }, {
                "track": 6,
                "name": "Le réveil de la mariée",
                "length": "9:17",
                "file": "06_Le_reveil_de_la_mariee"
            }, {
                "track": 7,
                "name": "Le golf",
                "length": "9:17",
                "file": "07_Le_golf"
            }, {
                "track": 8,
                "name": "La pêche",
                "length": "9:17",
                "file": "08_La_peche"
            }, {
                "track": 9,
                "name": "La pieuvre",
                "length": "9:17",
                "file": "09_La_pieuvre"
            }, {
                "track": 10,
                "name": "Le tennis",
                "length": "9:17",
                "file": "10_Le_tennis"
            }, {
                "track": 11,
                "name": "Le pique-nique",
                "length": "9:17",
                "file": "11_Le_pique_nique"
            }, {
                "track": 12,
                "name": "Les courses",
                "length": "9:17",
                "file": "12_Les_courses"
            }, {
                "track": 13,
                "name": "Le bain de mer",
                "length": "9:17",
                "file": "13_Le_bain_de_mer"
            }, {
                "track": 14,
                "name": "La chasse",
                "length": "9:17",
                "file": "14_La_chasse"
            }, {
                "track": 15,
                "name": "La balançoire",
                "length": "9:17",
                "file": "15_La_balancoire"
            }, {
                "track": 16,
                "name": "Le water-chute",
                "length": "9:17",
                "file": "16_Le_water_whute"
            }, {
                "track": 17,
                "name": "Colin-Maillard",
                "length": "9:17",
                "file": "17_Colin_maillard"
            }, {
                "track": 18,
                "name": "Les quatre coins",
                "length": "9:17",
                "file": "18_Les_quatre_coins"
            }, {
                "track": 19,
                "name": "La comédie italienne",
                "length": "9:17",
                "file": "19_La_comedie_italienne"
            }, {
                "track": 20,
                "name": "Le feu d'artifice",
                "length": "9:17",
                "file": "20_Le_feu_d_artifice"
            }, {
                "track": 21,
                "name": "Le flirt",
                "length": "9:17",
                "file": "21_Le_flirt"
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
