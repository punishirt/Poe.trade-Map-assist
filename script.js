// ==UserScript==
// @name         poe.trade map-assist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Simple script to assist with searching for maps.
// @author       https://www.reddit.com/user/punishirt
// @match        http://poe.trade/*
// @match        https://poe.trade/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @require http://code.jquery.com/jquery-3.3.1.slim.min.js
// ==/UserScript==

(function() {
    'use strict';

    /*
    // snippet used to create maps list (run on https://pathofexile.gamepedia.com/List_of_base_maps)
    for(var x = 0;x < 16;x++) { mapsList.push([]) };

    jQuery(".item-table tbody tr").each( function(idx) {
        var row = jQuery(this);
        var mapSrc = jQuery('td:eq( 0 ) .c-item-hoverbox__display', row);
        var mapImg = mapSrc.find('img').attr('src');
        var mapName = mapSrc.find('span:eq(0) span:eq(0)').html();
        var tier = +jQuery('td:eq( 1 ) em', row).html();

        mapsList[tier-1].push( {
            tier: tier,
            map: mapName,
            icon: mapImg
        });
    });*/


    var baseMapsList = [[{"tier":1,"map":"Beach Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/1/1a/Beach_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=d538c4e83916081fd9d85574cbec6f7d","id":"map-1-0"},{"tier":1,"map":"Dungeon Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/7/72/Dungeon_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=e337840c27ae028e1029defa80d019b0","id":"map-1-1"},{"tier":1,"map":"Graveyard Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/d/d8/Graveyard_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=94bfcdfe5581fe2555e381b9da4af77f","id":"map-1-2"},{"tier":1,"map":"Lookout Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/1/13/Lookout_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=1ddfbb825c846739d2cef77cb11e0da1","id":"map-1-3"}],[{"tier":2,"map":"Alleyways Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/41/Alleyways_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=f8e9cc6b4eb8b433529bb4cf0b073d63","id":"map-2-0"},{"tier":2,"map":"Arid Lake Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/68/Arid_Lake_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=cc7889fe2b05a58002e3ba3d64d0e184","id":"map-2-1"},{"tier":2,"map":"Desert Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/9/9f/Desert_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=e6d974b72362654ba422d65fb8e25aba","id":"map-2-2"},{"tier":2,"map":"Flooded Mine Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/c/c8/Flooded_Mine_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=9240c2724e6dbc49535bf8f12ff7c227","id":"map-2-3"},{"tier":2,"map":"Marshes Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/36/Marshes_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=723fc508d11948f2b0ed6863ac1779dc","id":"map-2-4"},{"tier":2,"map":"Pen Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/0/03/Pen_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=ec018c65dddf7727d5a6bb2c56349a65","id":"map-2-5"}],[{"tier":3,"map":"Arcade Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/a/a1/Arcade_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=cac4642f85a4465ac087ab3b931ddc28","id":"map-3-0"},{"tier":3,"map":"Burial Chambers Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/31/Burial_Chambers_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=77834a76fe13ee3b37b541e7d12dde8f","id":"map-3-1"},{"tier":3,"map":"Cage Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/b/bd/Cage_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=53c134d6f53ccbba9ba8e7d72bf3e461","id":"map-3-2"},{"tier":3,"map":"Cells Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/8/81/Cells_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=100541884bf786166a07989c8732da5f","id":"map-3-3"},{"tier":3,"map":"Excavation Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/7/79/Excavation_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=c95872f105d25ff6dab45473e57d3dcb","id":"map-3-4"},{"tier":3,"map":"Iceberg Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/34/Iceberg_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=74d8aeb581d20d8680a51f57a5a468b3","id":"map-3-5"},{"tier":3,"map":"Leyline Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/49/Leyline_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=24d6774e68f11e05442695c4fac000ef","id":"map-3-6"},{"tier":3,"map":"Peninsula Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/69/Peninsula_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=b1b24610a874f124d681845cc28e3680","id":"map-3-7"},{"tier":3,"map":"Port Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/7/74/Port_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=af52bec71867a7aa95e5b359e57f0c6b","id":"map-3-8"},{"tier":3,"map":"Springs Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/e/e7/Springs_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=2be289213528a4822f75431b0723dca5","id":"map-3-9"}],[{"tier":4,"map":"Canyon Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/0/0f/Canyon_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=9eb4636f744551259a5b84f69e9dd9e2","id":"map-4-0"},{"tier":4,"map":"Chateau Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/4f/Chateau_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=011c347fd49cd1919d7dbb8a996a3384","id":"map-4-1"},{"tier":4,"map":"City Square Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/f/f6/City_Square_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=6d7b201391ecdc42912fa03ce5f48598","id":"map-4-2"},{"tier":4,"map":"Courthouse Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/0/04/Courthouse_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=46a2e157e2fc0b0a2b3e67534ab14602","id":"map-4-3"},{"tier":4,"map":"Gorge Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/33/Gorge_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=73a7d0b8faa296b13ed4cce57c48e70d","id":"map-4-4"},{"tier":4,"map":"Grotto Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/41/Grotto_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=2016216965699fa55b36460cc5a7d831","id":"map-4-5"},{"tier":4,"map":"Lighthouse Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/8/8a/Lighthouse_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=0fc3fe5617df1435c7e1998529c96980","id":"map-4-6"},{"tier":4,"map":"Relic Chambers Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/8/81/Relic_Chambers_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=f9f0aa411c27460353799bdc0a49a11e","id":"map-4-7"},{"tier":4,"map":"Strand Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/a/a1/Strand_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=87422d2d28b97f286cb5f393c59621b0","id":"map-4-8"},{"tier":4,"map":"Volcano Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/c/cf/Volcano_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=e8a3214b3dfecd24f1ccbeb2d8f815af","id":"map-4-9"}],[{"tier":5,"map":"Ancient City Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/c/cf/Ancient_City_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=559ccb86d4b2b8ba70de9da7cccda632","id":"map-5-0"},{"tier":5,"map":"Barrows Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/43/Barrows_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=447b01255b45dc7cc3c31d65dc631603","id":"map-5-1"},{"tier":5,"map":"Channel Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/9/98/Channel_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=169d8b4fb0edb62a43cde3ed3c5cf77a","id":"map-5-2"},{"tier":5,"map":"Conservatory Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/2/24/Conservatory_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=c82677b0e6a10d3fc9b871a5ce84b680","id":"map-5-3"},{"tier":5,"map":"Harbinger Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/65/Harbinger_Map_%28Low_Tier%29_inventory_icon.png?version=3249a1d096e3f198f7674cebb8d27710","id":"map-5-4"},{"tier":5,"map":"Haunted Mansion Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/f/f7/Haunted_Mansion_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=63cbb76d18568e79799327d0c37a04ad","id":"map-5-5"},{"tier":5,"map":"Ivory Temple Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/1/1f/Ivory_Temple_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=95c9780195b2aab9f3d1deea32bf6c7f","id":"map-5-6"},{"tier":5,"map":"Maze Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/d/dc/Maze_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=5385803febb42ab137bccc5270ea4d5a","id":"map-5-7"},{"tier":5,"map":"Spider Lair Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/8/8b/Spider_Lair_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=0b54c42cabe0eec23bb7ddbeb2e00c27","id":"map-5-8"},{"tier":5,"map":"Sulphur Vents Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/4e/Sulphur_Vents_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=f4b7d6d61efea8cb18a31a4d3c410722","id":"map-5-9"},{"tier":5,"map":"Toxic Sewer Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/6f/Toxic_Sewer_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=55610cf33eb4448a9bf71345feadca91","id":"map-5-10"}],[{"tier":6,"map":"Academy Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/c/c0/Academy_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=27a56a2c34b11d1b866faede6572fd70","id":"map-6-0"},{"tier":6,"map":"Ashen Wood Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/a/a6/Ashen_Wood_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=cfe7dbd20da1c27f51c3b804dbd652df","id":"map-6-1"},{"tier":6,"map":"Atoll Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/a/aa/Atoll_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=074404ba84630cabe816d81aebb195e7","id":"map-6-2"},{"tier":6,"map":"Cemetery Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/8/81/Cemetery_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=068b7190885dd07317a6944ceb676df6","id":"map-6-3"},{"tier":6,"map":"Fields Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/f/f6/Fields_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=84d0fdf22ea32b2b6b3497d4e05b2be6","id":"map-6-4"},{"tier":6,"map":"Jungle Valley Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/c/ca/Jungle_Valley_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=f1bb53b9089cce9e2ee4eb87876f7769","id":"map-6-5"},{"tier":6,"map":"Mausoleum Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/8/82/Mausoleum_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=ffde7a026d88a1ab6bb41092266296ac","id":"map-6-6"},{"tier":6,"map":"Phantasmagoria Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/5/5d/Phantasmagoria_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=54342d1c6f36c1c2ee332b9fa2fbf3c6","id":"map-6-7"},{"tier":6,"map":"Thicket Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/7/7b/Thicket_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=7c6c24d9b26ee98e82fa99b08d3eea00","id":"map-6-8"},{"tier":6,"map":"Underground Sea Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/b/b0/Underground_Sea_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=2378d3ea481b258a24b08d893eaae97e","id":"map-6-9"},{"tier":6,"map":"Wharf Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/61/Wharf_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=6bdaa5340209af55906f276acf63fc60","id":"map-6-10"}],[{"tier":7,"map":"Arachnid Nest Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/5/5b/Arachnid_Nest_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=01f6d27dc95cc0e1f6912b7684d46cff","id":"map-7-0"},{"tier":7,"map":"Bazaar Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/8/8f/Bazaar_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=0cc1112f316e189bef650a651cf5527f","id":"map-7-1"},{"tier":7,"map":"Bone Crypt Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/7/77/Bone_Crypt_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=8629d265a37bbac3dd1880efc6273cd2","id":"map-7-2"},{"tier":7,"map":"Coral Ruins Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/e/ea/Coral_Ruins_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=f1d4e580c50bcf9df7fc19555263eeab","id":"map-7-3"},{"tier":7,"map":"Dunes Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/1/12/Dunes_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=abab153fe5376ef3b0df0c524931e115","id":"map-7-4"},{"tier":7,"map":"Gardens Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/b/ba/Gardens_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=abf4c757361d5681f4df24e8837e4b1b","id":"map-7-5"},{"tier":7,"map":"Lava Chamber Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/7/78/Lava_Chamber_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=e066707930365fef7a9eeef405a09d80","id":"map-7-6"},{"tier":7,"map":"Ramparts Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/64/Ramparts_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=78dbcbbf51dc766d91421494f79157e9","id":"map-7-7"},{"tier":7,"map":"Residence Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/5/5d/Residence_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=eaf819b0353df1574792cf085089d85c","id":"map-7-8"},{"tier":7,"map":"Tribunal Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/2/2d/Tribunal_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=79bc46d56a5a4d6b809b56f226d52460","id":"map-7-9"},{"tier":7,"map":"Underground River Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/41/Underground_River_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=e2aed50549421ddac2f8e383d7dbb2b7","id":"map-7-10"}],[{"tier":8,"map":"Armoury Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/e/e1/Armoury_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=f09bffdc9bcc44811cd1255e08e891c6","id":"map-8-0"},{"tier":8,"map":"Courtyard Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/2/29/Courtyard_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=9d921f7565b1d2aae2a0d72a5c277200","id":"map-8-1"},{"tier":8,"map":"Geode Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/e/e9/Geode_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=95b0bef1ac634e52c2fe73b3980c0021","id":"map-8-2"},{"tier":8,"map":"Infested Valley Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/7/78/Infested_Valley_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=2613d37b56c829f02e4c1b17324de77c","id":"map-8-3"},{"tier":8,"map":"Laboratory Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/0/0f/Laboratory_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=7371b6685dd27ef701cc7b8b4341ec0b","id":"map-8-4"},{"tier":8,"map":"Mineral Pools Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/f/fd/Mineral_Pools_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=dfc14254b5271a11fb79d3ffb17e513d","id":"map-8-5"},{"tier":8,"map":"Mud Geyser Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/47/Mud_Geyser_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=4ed2f8cf3500750f53b4ccde26a74eb9","id":"map-8-6"},{"tier":8,"map":"Overgrown Ruin Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/6a/Overgrown_Ruin_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=49ba7be5fd918c397d97f92d1ff6999e","id":"map-8-7"},{"tier":8,"map":"Shore Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/a/a7/Shore_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=bce87c92a856baf46a088b85a0d7a58c","id":"map-8-8"},{"tier":8,"map":"Tropical Island Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/9/99/Tropical_Island_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=a7de31386494012d72cf6bdae3c58175","id":"map-8-9"},{"tier":8,"map":"Vaal Pyramid Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/f/f6/Vaal_Pyramid_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=148378dcb29f5469c716a5c39a0202ae","id":"map-8-10"}],[{"tier":9,"map":"Arena Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/f/f3/Arena_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=93a03190f78292efbccf24e8c14fdde2","id":"map-9-0"},{"tier":9,"map":"Estuary Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/5/58/Estuary_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=d8e69be403d68b3afecf70908ef87caa","id":"map-9-1"},{"tier":9,"map":"Moon Temple Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/7/7c/Moon_Temple_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=0188ae80f0bcf2a385a1dabc1a9a1187","id":"map-9-2"},{"tier":9,"map":"Museum Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/2/22/Museum_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=32e3538ee1afdbb272e5b2f6cd98e6e6","id":"map-9-3"},{"tier":9,"map":"Plateau Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/0/03/Plateau_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=8b8565d97fd1ade694e5a6161b3e7355","id":"map-9-4"},{"tier":9,"map":"Scriptorium Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/0/03/Scriptorium_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=094cd752d243e3317dd519c52c77d437","id":"map-9-5"},{"tier":9,"map":"Sepulchre Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/31/Sepulchre_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=82ee4c56a5dfa744f8621171c1e5cc62","id":"map-9-6"},{"tier":9,"map":"Temple Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/2/26/Temple_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=332dc068655250b35d51dcc511bc715e","id":"map-9-7"},{"tier":9,"map":"Tower Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/3f/Tower_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=627958a0f89bfe826d85f16d2b871e5f","id":"map-9-8"},{"tier":9,"map":"Vault Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/0/03/Vault_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=f89bba3f4a5b04b08fc18b057841be67","id":"map-9-9"},{"tier":9,"map":"Waste Pool Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/e/eb/Waste_Pool_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=106b078b2028971b70a07083853abd69","id":"map-9-10"}],[{"tier":10,"map":"Arachnid Tomb Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/69/Arachnid_Tomb_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=1a57871d67d1da0525027bc807e58166","id":"map-10-0"},{"tier":10,"map":"Belfry Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/35/Belfry_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=632b5da53febfd9eea6e3f9b682a5d0f","id":"map-10-1"},{"tier":10,"map":"Bog Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/47/Bog_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=d96cab5fe88d01e363bb8988fadb4762","id":"map-10-2"},{"tier":10,"map":"Cursed Crypt Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/3f/Cursed_Crypt_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=ee7724c2dc0562e18406198c172daaf9","id":"map-10-3"},{"tier":10,"map":"Harbinger Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/c/c3/Harbinger_Map_%28Mid_Tier%29_inventory_icon.png?version=e973e49be020d4007e097422fb42e8dd","id":"map-10-4"},{"tier":10,"map":"Orchard Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/4e/Orchard_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=9d0e023ea82c3ff0d6854e2e839f4c28","id":"map-10-5"},{"tier":10,"map":"Pier Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/42/Pier_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=af106d356020f859b8ffe488c95fb921","id":"map-10-6"},{"tier":10,"map":"Precinct Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/e/ee/Precinct_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=57dfdc9210b6565c24e4642f8979c916","id":"map-10-7"},{"tier":10,"map":"Shipyard Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/0/0e/Shipyard_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=7d6add388fefe802dcd2a2dd23d9e60e","id":"map-10-8"},{"tier":10,"map":"Siege Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/9/9d/Siege_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=8c20d5c3e48c3b423e86f0c95cb2bc79","id":"map-10-9"},{"tier":10,"map":"Wasteland Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/9/9a/Wasteland_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=a47695ae514d5392f93f931cc4faaffe","id":"map-10-10"}],[{"tier":11,"map":"Colonnade Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/0/0b/Colonnade_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=47af2cf627792db5fc7fdb5a95d72ba4","id":"map-11-0"},{"tier":11,"map":"Coves Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/1/13/Coves_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=a42e95500e2c8c792f7196fdd68f15b2","id":"map-11-1"},{"tier":11,"map":"Factory Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/9/97/Factory_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=b149a2fc798d9d9f7c342ca778d2cffb","id":"map-11-2"},{"tier":11,"map":"Lair Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/2/2b/Lair_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=b5ed20e411648ab1e3ae395ef59b5116","id":"map-11-3"},{"tier":11,"map":"Mesa Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/c/ca/Mesa_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=c569560a20b272e220f25a5e6cd581e0","id":"map-11-4"},{"tier":11,"map":"Pit Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/6a/Pit_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=90eda3e18816c4d932bc756246d826a9","id":"map-11-5"},{"tier":11,"map":"Primordial Pool Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/e/e4/Primordial_Pool_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=a9502cd20a7382cf83c083ee5d303929","id":"map-11-6"},{"tier":11,"map":"Promenade Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/37/Promenade_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=49e0b42127a532220e519d53666a179a","id":"map-11-7"},{"tier":11,"map":"Shaped Academy Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/41/Shaped_Academy_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=9eee9d31097b1ead6960e483c4fedc08","id":"map-11-8"},{"tier":11,"map":"Spider Forest Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/c/c2/Spider_Forest_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=b0b57139d6bed0f56b20d3f2cac1ba0c","id":"map-11-9"},{"tier":11,"map":"Waterways Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/4d/Waterways_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=1100166078c114b0ac8702776f83d564","id":"map-11-10"}],[{"tier":12,"map":"Castle Ruins Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/6d/Castle_Ruins_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=fd6a1dd39143d851dc7a19b6f3f18142","id":"map-12-0"},{"tier":12,"map":"Crystal Ore Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/3d/Crystal_Ore_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=13dafdacf8c6c512e838b9d4ca996eb0","id":"map-12-1"},{"tier":12,"map":"Defiled Cathedral Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/8/88/Defiled_Cathedral_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=1d047063908c23c2ccc97e2a47be187f","id":"map-12-2"},{"tier":12,"map":"Necropolis Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/6e/Necropolis_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=eba555e1a31910e5f3533fe7ef6c06b5","id":"map-12-3"},{"tier":12,"map":"Overgrown Shrine Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/6a/Overgrown_Shrine_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=ed1164838e7e403d12ca4aa532945f8d","id":"map-12-4"},{"tier":12,"map":"Racecourse Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/61/Racecourse_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=27d7e0076216f3722bf02497411fdf6c","id":"map-12-5"},{"tier":12,"map":"Summit Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/6a/Summit_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=f69d0e38dee95f89559fdba2ca5efa39","id":"map-12-6"},{"tier":12,"map":"Torture Chamber Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/b/b3/Torture_Chamber_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=20a3e8cfe46c1ab2994a5868ad73f9ba","id":"map-12-7"},{"tier":12,"map":"Villa Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/32/Villa_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=dccd97578744f1046d20bd2234e8f444","id":"map-12-8"}],[{"tier":13,"map":"Arsenal Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/b/b3/Arsenal_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=e5f2eacce5bd240d628bfb8b802096b4","id":"map-13-0"},{"tier":13,"map":"Caldera Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/1/14/Caldera_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=c066938a679c95df0218ba05ee0a8aee","id":"map-13-1"},{"tier":13,"map":"Core Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/9/94/Core_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=a88c43bfaa65fcc7157b3aa257c4fac1","id":"map-13-2"},{"tier":13,"map":"Desert Spring Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/a/af/Desert_Spring_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=7a0e0afce674259a7d7c5ac9c3167e14","id":"map-13-3"},{"tier":13,"map":"Ghetto Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/b/b5/Ghetto_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=3b2c4b69c842ac16fb5aa2e2fc356f87","id":"map-13-4"},{"tier":13,"map":"Malformation Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/f/f8/Malformation_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=97533b7dac143c6bb237cd40c6fda61c","id":"map-13-5"},{"tier":13,"map":"Park Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/a/ad/Park_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=85a7b4bf6a62443eede67e6dc9800b89","id":"map-13-6"},{"tier":13,"map":"Shrine Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/40/Shrine_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=0dbc91f072c34fb4c4a77a7e2d7ae50b","id":"map-13-7"},{"tier":13,"map":"Terrace Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/c/c2/Terrace_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=99cfbb7e1d53c5e654d92f1cbd99cb21","id":"map-13-8"}],[{"tier":14,"map":"Acid Lakes Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/c/c5/Acid_Lakes_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=3189a240ab65d9a4a4fc54b2c17cca68","id":"map-14-0"},{"tier":14,"map":"Colosseum Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/b/b0/Colosseum_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=220dfe2c7d83691fb68df4c2f9914ecf","id":"map-14-1"},{"tier":14,"map":"Crimson Temple Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/e/ee/Crimson_Temple_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=90fa03cf0ca32226f43146e0dfca9018","id":"map-14-2"},{"tier":14,"map":"Dark Forest Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/9/98/Dark_Forest_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=49d0404f13587668585cbed8cbe07125","id":"map-14-3"},{"tier":14,"map":"Dig Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/1/15/Dig_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=873f994ff36af83811e949f160f152d1","id":"map-14-4"},{"tier":14,"map":"Palace Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/b/b9/Palace_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=204f8c7756e5293ade291a74fbd62fe6","id":"map-14-5"},{"tier":14,"map":"Plaza Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/37/Plaza_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=1e1cdf86a441c837005aa4e9569a0390","id":"map-14-6"}],[{"tier":15,"map":"Basilica Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/0/0d/Basilica_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=c81c361959d8a0f3422a3d8615593d27","id":"map-15-0"},{"tier":15,"map":"Carcass Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/3/3c/Carcass_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=a79110c370b38812ecb1011637e9dbe5","id":"map-15-1"},{"tier":15,"map":"Harbinger Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/0/00/Harbinger_Map_%28High_Tier%29_inventory_icon.png?version=dbae716662399c73f453e68c8f52af73","id":"map-15-2"},{"tier":15,"map":"Lava Lake Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/c/cc/Lava_Lake_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=b6e709eb66281d07f0e0c7c7d0e6845d","id":"map-15-3"},{"tier":15,"map":"Reef Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/6/6f/Reef_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=f9a35232cee5655e83343d1ca1921872","id":"map-15-4"},{"tier":15,"map":"Sunken City Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/4/4c/Sunken_City_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=8f2d2d20b6a1c569080683ec36fbe71a","id":"map-15-5"}],[{"tier":16,"map":"Forge of the Phoenix Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/0/0b/Forge_of_the_Phoenix_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=51dc21208645cbeb08ff2f85cc43065e","id":"map-16-0"},{"tier":16,"map":"Lair of the Hydra Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/2/2d/Lair_of_the_Hydra_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=46b532e0f3ef3b970853ca210dff4693","id":"map-16-1"},{"tier":16,"map":"Maze of the Minotaur Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/a/a2/Maze_of_the_Minotaur_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=a9ae8807426be8ea65fe089a10f8dd3b","id":"map-16-2"},{"tier":16,"map":"Pit of the Chimera Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/1/18/Pit_of_the_Chimera_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=cc46603c0cb2d4f2bd9d464bae9db2b4","id":"map-16-3"},{"tier":16,"map":"Vaal Temple Map","icon":"https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/a/a6/Vaal_Temple_Map_%28War_for_the_Atlas%29_inventory_icon.png?version=f529a12cc13f7263f3bfbc389ad7de66","id":"map-16-4"}]]
    var mapsList = [];

    GM_addStyle("#map-list-ct { width: 130px; overflow-y: hidden; overflow-y: auto;height: 100vh; position: fixed; top: 0px; left: 0px; background: #0F0F0F; border-right: 2px solid rgba(255, 255, 255, 0.2); }");
    GM_addStyle("#map-list-ct .reset-maps-link { text-align: center; color: orange; text-decoration: underline;  background: black;  border-top: 2px solid rgba(255, 255, 255, 0.3);  padding: 10px 5px; cursor: pointer;}");
    GM_addStyle("ul.map-list { list-style: none; }");
    GM_addStyle("ul.map-list li { max-width: 80%; text-align: center; margin: 0 auto; }");
    GM_addStyle("ul.map-list li { max-width: 80%; text-align: center; margin: 0 auto; }");
    GM_addStyle("ul.map-list li h6 { font-size: 12px !important; color: orange; }");
    GM_addStyle("ul.map-list li img { max-width: 50px; cursor: pointer; }");
    GM_addStyle("ul.map-list li.hidden-map { opacity: 0.3; }");

    var updateSearch = function() {
        var mapImg = jQuery(this);
        var el = jQuery('#search-form');
        if (el.css('display') == "block") {
            jQuery('#toggle-search-form').click();
        }
        jQuery("#name").val(mapImg.attr('data-map-name')).trigger('change');
        jQuery("#search").submit();
    }

    var sortEnabledMaps = function (a, b){
        var a1 = a.order ? a.order : 1;
        var b1 = b.order ? b.order : 1;
        return ((a1 < b1) ? 1 : ((a1 > b1) ? -1 : 0));
    }


    var toggleMap = function() {
        var el = jQuery(this);
        var id = el.attr('id');
        var tier = +id.split('-')[1] - 1;
        for(var x = 0;x < mapsList[tier].length;x++) {
            var order = mapsList[tier][x].order;
            if( mapsList[tier][x].id === id) {
                mapsList[tier][x].order = order ? order * -1 : -1;
            }
        }
        mapsList[tier].sort(sortEnabledMaps);
        renderMaps();
        GM_setValue('mapsList', JSON.stringify(mapsList));
        return false;
    };

    var resetMaps = function() {
        mapsList = JSON.parse(JSON.stringify(baseMapsList));
        GM_setValue('mapsList', JSON.stringify(mapsList));
        renderMaps();
    }

    var renderMaps = function() {

        var tierUl = jQuery('.map-list');
        tierUl.empty();

        var selectedTier = +jQuery('.map-tier-selector:eq(0)').val();
        GM_setValue('lastTier', selectedTier);

        var mapSelection = mapsList[ selectedTier ];
        mapsList[selectedTier].sort(sortEnabledMaps);

        for (var x = 0;x < mapSelection.length;x++ ) {
            var map = mapSelection[x];
            var stateCls = map.order == -1 ? 'hidden-map' : '';
            var mapDetails = jQuery('<li></li>').addClass('map-details').addClass(stateCls);
            mapDetails.append( jQuery('<h6></h6>').html(map.map) );
            mapDetails.append( jQuery('<img></img>').attr('src', map.icon).attr('id', map.id).attr('data-map-name', map.map) );
            tierUl.append(mapDetails);
        }
        jQuery('.map-details img').contextmenu(toggleMap);
        jQuery('.map-details img').click(updateSearch);
    }

    var initMapHelper = function() {
        var list = GM_getValue('mapsList');
        var lastTier = GM_getValue('lastTier');
        if(!list) {
            list = JSON.stringify(baseMapsList);
            GM_setValue('mapsList', list);
        }
        mapsList = JSON.parse(list);


        var ct = jQuery('<div></div>').attr('id', 'map-list-ct');
        jQuery('body').append(ct);

        var tierSelector = jQuery('<select></select>').addClass('map-tier-selector');
        for(var x = 0;x < mapsList.length;x++) {
            tierSelector.append( jQuery('<option></option>').val(x).html('Tier ' + (x+1)));
        }
        ct.append(tierSelector);

        if(!lastTier) {
            lastTier = 0;
        } else {
            jQuery('.map-tier-selector:eq(0)').val(+lastTier);
        }
        tierSelector.change(renderMaps);

        var tierUl = jQuery('<ul></ul>').addClass('map-list');
        jQuery('#map-list-ct').append(tierUl);

        renderMaps();

        var resetMapsEl = jQuery("<div></div>").html('reset maps').css({'text-align': 'center', 'color': 'orange', 'text-decoration': 'underline'}).addClass('reset-maps-link');
        resetMapsEl.click(resetMaps);
        ct.append(resetMapsEl);
    }

    initMapHelper();
})();
