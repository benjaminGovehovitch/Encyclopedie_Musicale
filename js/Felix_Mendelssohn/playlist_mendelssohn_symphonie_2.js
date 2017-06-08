// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Mendelssohn_Symphonie_2/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Maestoso con moto - Allegro",
                "length": "11:04",
                "file": "01_Maestoso_con_moto_Allegro"
            }, {
                "track": 2,
                "name": "Allegretto un poco agitato",
                "length": "5:45",
                "file": "02_Allegretto_un_poco_agitato"
            }, {
                "track": 3,
                "name": "Adagio religioso",
                "length": "6:38",
                "file": "03_Adagio_religioso"
            }, {
                "track": 4,
                "name": "Allegro moderato maestoso - Allegro di molto",
                "length": "6:44",
                "file": "04_Allegro_moderato_maestoso_Allegro_di_molto"
            }, {
                "track": 5,
                "name": "Récitatif - Allegro moderato",
                "length": "2:56",
                "file": "05_Recitatif_Allegro_moderato"
            }, {
                "track": 6,
                "name": "A tempo moderato",
                "length": "1:55",
                "file": "06_A_tempo_moderato"
            }, {
                "track": 7,
                "name": "Duo : Andante",
                "length": "5:24",
                "file": "07_Duo_Andante"
            }, {
                "track": 8,
                "name": "Allegro un poco agitato",
                "length": "4:28",
                "file": "08_Allegro_un_poco_agitato"
            }, {
                "track": 9,
                "name": "Allegro maestoso e molto vivace",
                "length": "5:06",
                "file": "09_Allegro_maestoso_e_molto_vivace"
            }, {
                "track": 10,
                "name": "Choral. Andante con moto, un poco più animato",
                "length": "4:47",
                "file": "10_Choral_Andante_con_moto_un_poco_piu_animato"
            }, {
                "track":11,
                "name": "Duo : Andante sostenuto assai",
                "length": "4:32",
                "file": "11_Duo_Andante_sostenuto_assai"
            }, {
                "track": 12,
                "name": "Choeur final ; Allegro non troppo",
                "length": "5:32",
                "file": "12_Choeur_final_Allegro_non_troppo"
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
