// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Debussy_Les_preludes_Livre_1/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Danseuses de Delphes : Lent et grave",
                "length": "3:20",
                "file": "01DanseusesDeDelphes"
            }, {
                "track": 2,
                "name": "Voiles : Modéré",
                "length": "3:45",
                "file": "02Voiles"
            }, {
                "track": 3,
                "name": "Le vent dans la plaine : Animé",
                "length": "2:12",
                "file": "03LeVentDansLaPlaine"
            }, {
                "track": 4,
                "name": "«Les sons et les parfums tournent dans l'air du soir» : Modéré",
                "length": "3:55",
                "file": "04LesSonsEtLesParfumsTournentDansLairDuSoir"
            }, {
                "track": 5,
                "name": "Les collines d'Anacapri : Très modéré",
                "length": "2:59",
                "file": "05LesCollinesDanacapri"
            }, {
                "track": 6,
                "name": "Des pas sur la neige : Triste et lent",
                "length": "3:56",
                "file": "06DesPasSurLaNeige"
            }, {
                "track": 7,
                "name": "Ce qu'a vu le vent d'ouest : Animé et tumultueux",
                "length": "3:28",
                "file": "07CeQuaVuLeVentDouest"
            }, {
                "track": 8,
                "name": "La fille aux cheveux de lin : Très calme et doucement expressif",
                "length": "2:13",
                "file": "08LaFilleAuxCheveuxDeLin"
            }, {
                "track": 9,
                "name": "La sérénade interrompue : Modérément animé",
                "length": "2:37",
                "file": "09LaSrnadeInterrompue"
            }, {
                "track": 10,
                "name": "La cathédrale engloutie : Profondément calme",
                "length": "5:36",
                "file": "10LaCathdraleEngloutie"
            }, {
                "track": 11,
                "name": "La danse de Puck : Capricieux et léger",
                "length": "2:27",
                "file": "11LaDanseDePuck"
            }, {
                "track": 12,
                "name": "Minstrels : Modéré",
                "length": "2:02",
                "file": "12Minstrels"
            }, {
                "track": 13,
                "name": "Reflets dans l'eau",
                "length": "5:26",
                "file": "13RefletsDansLeau"
            }, {
                "track": 14,
                "name": "Hommage à Rameau",
                "length": "5:48",
                "file": "14HommageRameau"
            }, {
                "track": 15,
                "name": "Mouvement",
                "length": "3:30",
                "file": "15Mouvement"
            }, {
                "track": 16,
                "name": "Masques",
                "length": "4:33",
                "file": "16Masques"
            }, {
                "track": 17,
                "name": "D'un cahier d'esquisses",
                "length": "4:49",
                "file": "17DunCahierDesquisses"
            }, {
                "track": 18,
                "name": "L'isle joyeuse",
                "length": "5:46",
                "file": "18LisleJoyeuse"
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
