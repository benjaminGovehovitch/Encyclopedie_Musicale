// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Debussy_Les_preludes_Livre_2/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Brouillards : Modéré",
                "length": "3:56",
                "file": "01_Brouillards"
            }, {
                "track": 2,
                "name": "Feuilles mortes : Lent et mélancolique",
                "length": "4:02",
                "file": "02_Feuilles_mortes"
            }, {
                "track": 3,
                "name": "La Puerta del Vino (La porte du vin) : Mouvement de Habanera",
                "length": "4:31",
                "file": "03_La_Puerta_del_Vino"
            }, {
                "track": 4,
                "name": "«Les fées sont d'exquises danseuses» : Rapide et léger",
                "length": "3:37",
                "file": "04_Les_fees_sont_d_exquises_danseuses"
            }, {
                "track": 5,
                "name": "Bruyères : Calme",
                "length": "3:24",
                "file": "05_Bruyeres"
            }, {
                "track": 6,
                "name": "Général Lavine - Excentric : Dans le style et le mouvement d'un Cake-walk",
                "length": "3:18",
                "file": "06_General_Lavine"
            }, {
                "track": 7,
                "name": "La terrasse des audiences du clair de lune : Lent",
                "length": "6:27",
                "file": "07_La_terrasse_des_audiences_du_clair_de_lune"
            }, {
                "track": 8,
                "name": "Ondine : Scherzando",
                "length": "4:12",
                "file": "08_Ondine"
            }, {
                "track": 9,
                "name": "Hommage à S. Pickwick Esq. P.P.M.P.C. : Grave",
                "length": "2:46",
                "file": "09_Hommage_a_Samuel_Pickwick"
            }, {
                "track": 10,
                "name": "Canope  : Très calme et doucement triste",
                "length": "3:30",
                "file": "10_Canope"
            }, {
                "track": 11,
                "name": "Les tierces alternées : Modérément animé",
                "length": "3:01",
                "file": "11_Les_tiers_alternees"
            }, {
                "track": 12,
                "name": "Feux d'artifice : Modérément animé",
                "length": "4:37",
                "file": "12_Feux_d_artifice"
            }, {
                "track": 13,
                "name": "Ballade (slave) pour piano",
                "length": "8:31",
                "file": "13_Ballade_slave_pour_piano"
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
