// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Satie_Genevieve_de_Brabant/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Prélude",
                "length": "0:54",
                "file": "01_Prelude"
	    },{
                "track": 2,
                "name": "Cantique à Geneviève",
                "length": "10:55",
                "file": "02_Cantique_a_Genevieve"
	    },{
                "track": 3,
                "name": "Entracte",
                "length": "0:54",
                "file": "03_Entracte"
	    },{
                "track": 4,
                "name": "Acte 1",
                "length": "0:10",
                "file": "04_Acte_1"
	    },{
                "track": 5,
                "name": "Choeur",
                "length": "0:30",
                "file": "05_Choeur"
	    },{
                "track": 6,
                "name": "Geneviève au supplice",
                "length": "0:29",
                "file": "06_Genevieve_au_supplice"
	    },{
                "track": 7,
                "name": "Entrée des soldats",
                "length": "0:17",
                "file": "07_Entree_des_soldats"
	    },{
                "track": 8,
                "name": "Acte 2",
                "length": "0:27",
                "file": "08_Acte_2"
	    },{
                "track": 9,
                "name": "Air de Geneviève",
                "length": "2:37",
                "file": "09_Air_de_genevieve"
	    },{
                "track": 10,
                "name": "Sonnerie de cor",
                "length": "0:28",
                "file": "10_Sonnerie_de_cor"
	    },{
                "track": 11,
                "name": "Entrée des soldats",
                "length": "0:27",
                "file": "11_Entree_des_soldats"
	    },{
                "track": 12,
                "name": "Acte 3",
                "length": "0:23",
                "file": "12_Acte_3"
	    },{
                "track": 13,
                "name": "Air de Golo",
                "length": "0:55",
                "file": "13_Air_de_Golo"
	    },{
                "track": 14,
                "name": "Entrée des soldats",
                "length": "0:20",
                "file": "14_Entree_des_soldats"
	    },{
                "track": 15,
                "name": "Cortège",
                "length": "0:29",
                "file": "15_Cortege"
	    },{
                "track": 16,
                "name": "Entrée des soldats",
                "length": "0:30",
                "file": "16_Entree_des_soldats"
	    },{
                "track": 17,
                "name": "Petit air de Geneviève",
                "length": "1:51",
                "file": "17_Petit_air_de_Genevieve"
	    },{
                "track": 18,
                "name": "Choeur final",
                "length": "0:26",
                "file": "18_Choeur_final"
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
