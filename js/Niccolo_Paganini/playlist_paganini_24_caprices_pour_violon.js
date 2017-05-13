// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Paganini_24_Caprices_pour_violon/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Caprice 1 (Andante) en mi majeur",
                "length": "1:37",
                "file": "01_Caprice_1"
	    },{
                "track": 2,
                "name": "Caprice 2 (Moderato) en si mineur",
                "length": "2:44",
                "file": "02_Caprice_2"
	    },{
                "track": 3,
                "name": "Caprice 3 (Sostenuto - presto - sostenuto) en mi mineur",
                "length": "2:55",
                "file": "03_Caprice_3"
	    },{
                "track": 4,
                "name": "Caprice 4 (Maestoso) en do mineur",
                "length": "6:23",
                "file": "04_Caprice_4"
	    },{
                "track": 5,
                "name": "Caprice 5 (Agitato) en la mineur",
                "length": "2:29",
                "file": "05_Caprice_5"
	    },{
                "track": 6,
                "name": "Caprice 6 (Lento) en sol mineur",
                "length": "3:28",
                "file": "06_Caprice_6"
	    },{
                "track": 7,
                "name": "Caprice 7 (Posato) en la mineur",
                "length": "3:53",
                "file": "07_Caprice_7"
	    },{
                "track": 8,
                "name": "Caprice 8 (Maestoso) en mi bémol majeur",
                "length": "2:38",
                "file": "08_Caprice_8"
	    },{
                "track": 9,
                "name": "Caprice 9 : La chasse (Allegretto) en mi majeur",
                "length": "2:33",
                "file": "09_Caprice_9"
	    },{
                "track": 10,
                "name": "Caprice 10 (Vivace) en sol mineur",
                "length": "2:24",
                "file": "10_Caprice_10"
	    },{
                "track": 11,
                "name": "Caprice 11 (Andante - Presto - Tempo I) en do majeur",
                "length": "3:28",
                "file": "11_Caprice_11"
	    },{
                "track": 12,
                "name": "Caprice 12 (Allegro) en la bémol majeur",
                "length": "2:48",
                "file": "12_Caprice_12"
	    },{
                "track": 13,
                "name": "Caprice 13 (Allegro) en si bémol majeur",
                "length": "2:33",
                "file": "13_Caprice_13"
	    },{
                "track": 14,
                "name": "Caprice 14 (Moderato) en mi bémol majeur",
                "length": "2:03",
                "file": "14_Caprice_14"
	    },{
                "track": 15,
                "name": "Caprice 15 (Posato) en mi mineur",
                "length": "2:32",
                "file": "15_Caprice_15"
	    },{
                "track": 16,
                "name": "Caprice 16 (Presto) en sol mineur",
                "length": "1:27",
                "file": "16_Caprice_16"
	    },{
                "track": 17,
                "name": "Caprice 17 (Sostenuto - Andante) en mi bémol majeur",
                "length": "3:12",
                "file": "17_Caprice_17"
	    },{
                "track": 18,
                "name": "Caprice 18 (Corrento - Allegro) en do majeur",
                "length": "2:25",
                "file": "18_Caprice_18"
	    },{
                "track": 19,
                "name": "Caprice 19 (Lento - Allegro Assai) en mi bémol majeur",
                "length": "2:47",
                "file": "19_Caprice_19"
	    },{
                "track": 20,
                "name": "Caprice 20 (Allegretto) en ré majeur",
                "length": "3:38",
                "file": "20_Caprice_20"
	    },{
                "track": 21,
                "name": "Caprice 21 (Amoroso - Presto) en la majeur",
                "length": "2:56",
                "file": "21_Caprice_21"
	    },{
                "track": 22,
                "name": "Caprice 22 (Marcato) en fa majeur",
                "length": "2:29",
                "file": "22_Caprice_22"
	    },{
                "track": 23,
                "name": "Caprice 23 (Posato) en mi bémol majeur",
                "length": "4:43",
                "file": "23_Caprice_23"
	    },{
                "track": 24,
                "name": "Caprice 24 (Thema - Quasi presto - Variationi - Finale) en la mineur",
                "length": "4:23",
                "file": "24_Caprice_24"
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
