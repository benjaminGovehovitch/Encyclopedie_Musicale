// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/

https://archive.org/download/Bizet_Carmen/08_Jose_ma_mere_je_la_vois.mp3
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/Bizet_Carmen/',
            extension = '',
                        tracks = [{
                "track": 1,
                "name": "Ouverture",
                "length": "3:43",
                "file": "01_Ouverture"
            }, {
                "track": 2,
                "name": "Sur la place, chacun passe",
                "length": "5:52",
                "file": "02_Soldiers_sur_la_place_chacun_passe"
            }, {
                "track": 3,
                "name": "Avec la garde montante",
                "length": "3:57",
                "file": "03_Street_Boys_avec_la_garde_montante"
            }, {
                "track": 4,
                "name": "C'est bien là, n'est-ce pas ?",
                "length": "1:16",
                "file": "04_Zuniga_c_est_bien_la_n_est_pas"
            }, {
                "track": 5,
                "name": "La cloche a sonné; nous, des ouvrières",
                "length": "3:34",
                "file": "05_Young_men_la_cloche_a-sonne_nous_des_ouvrieres"
            }, {
                "track": 6,
                "name": "Carmen! Sur tes pas, nous nous pressons tous",
                "length": "6:43",
                "file": "06_Young_men_carmen_sur_tes_pas_nous_nous_pressons_tous-"
            }, {
                "track": 7,
                "name": "Quels regards ! Quelle effronterie !",
                "length": "3:59",
                "file": "07_Jose_quels_regards_quelle_effronterie"
            }, {
                "track": 8,
                "name": "Ma mère, je la vois",
                "length": "6:35",
                "file": "08_Jose_ma_mere_je_la_vois"
            }, {
                "track": 9,
                "name": "Que se passe-t-il donc là-bas ?",
                "length": "3:03",
                "file": "09_Zuniga_que_se_passe_t_il_donc_la_bas"
            }, {
                "track": 10,
                "name": "Mon officier, c'était une querelle",
                "length": "3:47",
                "file": "10_Jose_mon_officier_d_etait_une_querelle"
            }, {
                "track": 11,
                "name": "Près des remparts de Séville",
                "length": "6:01",
                "file": "11_Carmen_pres_des_remparts_de_Seville"
            }, {
                "track": 12,
                "name": "Entracte",
                "length": "1:39",
                "file": "12_Entracte"
            }, {
                "track": 13,
                "name": "Les tringles des sistres tintaient",
                "length": "3:58",
                "file": "13_Carmen_les_tringles_des_sistres_tintaient"
            }, {
                "track": 14,
                "name": "Messieurs, Pastia me dit...",
                "length": "1:54",
                "file": "14_Frasquite_messieurs_Pastia_me_dit"
            }, {
                "track": 15,
                "name": "Votre toast, je peux vous le rendre",
                "length": "6:27",
                "file": "15_Escamillo_votre_toast_je_peux_vous_le_rendre"
            }, {
                "track": 16,
                "name": "Eh bien, vite, quelles nouvelles ?",
                "length": "5:28",
                "file": "16_Frasquite_eh_bien_vite_quelles_nouvelles"
            }, {
                "track": 17,
                "name": "Halte là ! Qui va là ?",
                "length": "2:55",
                "file": "17_Jose_halte_la_qui_va_la"
            }, {
                "track": 18,
                "name": "Lalalala",
                "length": "4:14",
                "file": "18_Carmen_lalalala"
            }, {
                "track": 19,
                "name": "La fleur que tu m'avias jetée",
                "length": "3:37",
                "file": "19_Jos_la_fleur_que_tu_m_avais_jete"
            }, {
                "track": 20,
                "name": "Non, tu ne m'aimes pas",
                "length": "3:38",
                "file": "20_Carmen_non_tu_ne_m_aimes_pas"
            }, {
                "track": 21,
                "name": "Holà ! Carmen ! Holà ! Holà !",
                "length": "4:28",
                "file": "21_Zuniga_hola_Carmen_hola_hola"
            }, {
                "track": 22,
                "name": "Entracte",
                "length": "2:35",
                "file": "22_Entracte"
            }, {
                "track": 23,
                "name": "Écoute, écoute, compagnon, écoute",
                "length": "6:41",
                "file": "23_The_men_ecoute_ecoute_compagnon_ecoute"
            }, {
                "track": 24,
                "name": "Mèlons ! Coupons !",
                "length": "3:17",
                "file": "24_Frasquita_et_Mercedes_melons_coupons"
            }, {
                "track": 25,
                "name": "Carreau ! Pique !",
                "length": "3:58",
                "file": "25_Carmen_carreau_pique"
            }, {
                "track": 26,
                "name": "Eh bien ?",
                "length": "3:41",
                "file": "26_Carmen_eh_bien"
            }, {
                "track": 27,
                "name": "C'est des contrebandiers le refuge ordinaire",
                "length": "6:25",
                "file": "27_Micaela_c-est_des_contrebandiers_le_refuge_ordinaire"
            }, {
                "track": 28,
                "name": "Quleques lignes plus bas et tout était fini",
                "length": "3:19",
                "file": "28_Escamillo_quleques_lignes_plus_bas_et_tout_etait_fini"
            }, {
                "track": 29,
                "name": "Holà, holà, José !",
                "length": "2:41",
                "file": "29_Carmen_hola_Hola_Jose"
            }, {
                "track": 30,
                "name": "Prends garde à toi, Carmen",
                "length": "5:27",
                "file": "30_Jose_prends_garde_a_toi_carmen.mp3"
            }, {
                "track": 31,
                "name": "Entracte",
                "length": "2:13",
                "file": "31_Entracte"
            }, {
                "track": 32,
                "name": "Dansez, dansez",
                "length": "1:55",
                "file": "32_Street_Vendors_dansez_dansez"
            }, {
                "track": 33,
                "name": "Ballet",
                "length": "5:40",
                "file": "33_Ballet"
            }, {
                "track": 34,
                "name": "Les voici ! Les voici !",
                "length": "3:48",
                "file": "34_Children_les_voici_les_voici"
            }, {
                "track": 35,
                "name": "Si tu m'aimes, Carmen",
                "length": "1:20",
                "file": "35_Escamillo_si_tu_m_aimes_carmen"
            }, {
                "track": 36,
                "name": "Place, place !",
                "length": "1:36",
                "file": "36_Police_place_place"
            }, {
                "track": 37,
                "name": "Place, place !",
                "length": "5:04",
                "file": "37_Carmen_c_est_toi"
            }, {
                "track": 38,
                "name": "Viva! viva ! La course est belle !",
                "length": "3:28",
                "file": "38_TheCrowd_viva_viva_la_course_est_belle"
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
