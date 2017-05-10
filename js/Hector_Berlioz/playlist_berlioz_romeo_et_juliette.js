// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/

/*https://archive.org/download/Berlioz_Romeo_et_Juliette/01_Introduction.mp3*/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Berlioz_Romeo_et_Juliette/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Introduction : Combats - Tumulte - Intervention du prince",
                "length": "4:45",
                "file": "01_Introduction"
            }, {
                "track": 2,
                "name": "Prologue : D'anciennes haines endormies",
                "length": "5:13",
                "file": "02_Prologue"
            }, {
                "track": 3,
                "name": "Strophes 1 : Premiers transports que nul n'oublie",
                "length": "6:38",
                "file": "03_Strophes_part1"
            }, {
                "track": 4,
                "name": "Strophe 2 : Bientôt de Roméo la pale rêverie - Scherzetto",
                "length": "3:23",
                "file": "04_Strophes_part2"
            }, {
                "track": 5,
                "name": "Roméo seul - Tristesse - Bruit lointain de bal et de concerto - Grande fête des Capulet",
                "length": "12:55",
                "file": "05_Romeo_seul"
            }, {
                "track": 6,
                "name": "Scène d'amour",
                "length": "18:51",
                "file": "06_Scene_d_amour"
            }, {
                "track": 7,
                "name": "La Reine Mab, ou la Fée des songes",
                "length": "8:37",
                "file": "07_La_reine_Mab"
            }, {
                "track": 8,
                "name": "Convoi funèbre de Juliette",
                "length": "9:42",
                "file": "08_Convoi_funebre_de_Juliette"
            }, {
                "track": 9,
                "name": "Roméo au tombeau des Capulet",
                "length": "8:01",
                "file": "09_Romeo_au_tombeau_des_Capulet"
            }, {
                "track": 10,
                "name": "Final : la foule accourt au cimetière - Récitatif et Air du Père Laurence - Rixe des Capulet et des Montaigus - Serment de réconciliation - Récitatif",
                "length": "4:08",
                "file": "10_Final"
            }, {
                "track": 11,
                "name": "Air - Rixe des Capulet et des Montaigus - Invocation du Père Laurence",
                "length": "9:27",
                "file": "11_Air_Rixe_des_Capulet_et_des_montaigus"
            }, {
                "track": 12,
                "name": "Serment",
                "length": "4:51",
                "file": "12_Serment"
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
