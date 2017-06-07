// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Satie_Mercure/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Marche - Ouverture",
                "length": "1:12",
                "file": "01_Marche_Ouverture"
	    },{
                "track": 2,
                "name": "La nuit",
                "length": "1:14",
                "file": "02_La_nuit"
	    },{
                "track": 3,
                "name": "Danse de tendre",
                "length": "2:09",
                "file": "03_Danse_de_tendresse"
	    },{
                "track": 4,
                "name": "Signes du zodiaque",
                "length": "0:49",
                "file": "04_Signes_du_zodiaque"
	    },{
                "track": 5,
                "name": "Entrée et danse de Mercure",
                "length": "1:14",
                "file": "05_Entree_et_danse_de_Mercure"
	    },{
                "track": 6,
                "name": "Danse des grâces",
                "length": "1:12",
                "file": "06_Danse_des_graces"
	    },{
                "track": 7,
                "name": "Bain des grâces",
                "length": "1:31",
                "file": "07_Bain_des_graces"
	    },{
                "track": 8,
                "name": "Fuite de Mercure",
                "length": "0:21",
                "file": "08_Fuite_de_Mercure"
	    },{
                "track": 9,
                "name": "Colère de Cerbère",
                "length": "0:28",
                "file": "09_Colere_de_Cerbere"
	    },{
                "track": 10,
                "name": "Polka des lettres",
                "length": "0:39",
                "file": "10_Polka_des_lettres"
	    },{
                "track": 11,
                "name": "Nouvelle danse",
                "length": "1:44",
                "file": "11_Nouvelle_danse"
	    },{
                "track": 12,
                "name": "Le chaos",
                "length": "0:37",
                "file": "12_Le_chaos"
	    },{
                "track": 13,
                "name": "Fianl : Rapt de Proserpine",
                "length": "1:13",
                "file": "13_Final_Rapt_de_Proserpine"
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
