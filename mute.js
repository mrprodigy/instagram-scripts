const dotenv = require('dotenv');
const puppeteer = require('puppeteer');
const { Console } = require('console');
const cheerio = require('cheerio');
dotenv.config({ path: "./config.env" });
const fetch = require("node-fetch");
const { STATUS_CODES } = require('http');
let bitchCount = 0;


start(process.env.NAME, process.env.PASS, 70);

async function start(user, pass, lastPics) {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await login(page, user, pass);
    let following;
    await check_following(browser);
    following = await getAllFollowing(page);
    console.log("all following:",JSON.stringify(following));

    // following=["eden_pinhasov_","lior_habas","grazielly_rosas","eden_zitooni","hadar.shechter","chirahya","shenhav.olario","gaya_.levi","coral_cohen77","morint11","_barlevi__","barellihi","or_chen.e","noy_ohana","liel_guster","rebecca_edri","naamaozery9","shir_6658","yyuvall","sapirnutrition","avital_biton1","rut_st17","zohar_hayon","talotan123","_emily321","ilana.tesler","liat_yos24","ayelet_moyal","noamtuviana","nastya.koshkin199624","chenhalevi1997","jessica_klempert","noam___dahan","yuvalperetz6","ariel_vernick","shirkarasenti","noa_ay","_shirayosef_","shani_ezra","naama2602","noybiton30","elina_tarnopolski","hadar_ben_lulu","lior_momrak","noya.twizer","yuli.sabov","avitalvoloch","eden.arad","mazal_levi5","rachliguetta","janet_michaelov","eden.elim","liyaraiz","stav_katan","hodayapaniri315","ifatp999","leehy181","rufta_hafti_habu","nofarcohen2505","eden_paikin","natali_mengistu","sapir.benharush.3","shir._.2020","morandvir25","sabina.92s","meitar_madarr","shoval.yona","liel.adiv","maayan.shar","daniella612200","edensibi","iska_harazi","noy_dahari","rachel_979","shoval__shalom","karin_hamer","sapir13a","_roniofir","yuval_hurgin_fit","sol_bendahan","yae_rom","noy_maman21","yovel_elkoby","ronih4411","nirit_shimon","shakedcohen8","alice.khay","mishelfigman","shirbenmoshe12","galavitan__","naama_krispin1","yuval_pinchas","miika16","nofarraz12","super_solomonov","shai_mashiach","revitalel","eden.esi","maysoll","meitar_ifrah","hen.atias","oshra.eluz","__yuvalelimelech__","talmazliah","tnyhsyqryts","ainoa_maurot","noamisrael99","themost_eliana","linoyshaday","shahar_samara","roni_malca1","shay_bar_rosenfeld","noy.primat","hadar_atad","topaz_efrati","shanir12","kessembi","raz_uziel","tehilamazor","krdana","shacharfanish","noamraviv1","omerzilberman","shiran_castro","noam_levii_","libi_barak","danielamran","yuvaledry","eden_vaknin__","eden_245","danielleamar97","hagareitam","zehavit__vexler","hila.cohen41","sahar_edri1","shai_knafo156","adi.jacob","hani_aslan1","einav_adoni","ben_david_yuval","edenh23","imbar_mizrachi","liorkaaa","shelly_zibenberg","tzlilrogel","yaara_even","ofir.moshe","or_salman13","shahafmoskovich1","x_nastia_18","sapir252","ofek_b99","osher_cohen_765","rotem.k7","tamar_zil1","meshi_mahtabi","nicole.pond","daph_aouat","shoval_menashe","_sapirbar_","zoharamor97","almogshmuel35","yovel_dayan","ofri_kilbert","shellys97","shaked_yaakov1","tzlil_naim","noya_levi231","bar_kakov","yulia_matlyuk","inbar_torres_","yael__biton","noy_abutbul2","may_cohen20","rina_moran","may_goldin","shakedpollak_","_tanya_m5","sivanhila_","adimaor55","levin.adar","melis_malki","a.nastasia3","alice_dratch","asiyat_yunaev","tali_feldman_","yael_kazakov","nofa05256","veronikadupreez","renana_hadad","avital_michaelov","gayacooper","just._.liza1","daniellosh223","sabrina_kirillov","sapir.lugasi_","johanna2626_","alisya_davidov","emi.guss","sharon_roz12","liron__michael","shirarachamim","edenmalka5","koral__m","liraz_b1","shirozer12318","chaya_94","zehavitha10","maayanderi_","ronlevi32","shaharsinai","shoham_cohen5","altdats","ayelet.123","noyasegev11","hilako1122","ayelet_gopshten1","shirachdut75","rachelkasa1234","helen97_g","barkaylevi","matanjogiel","zahva_hanukayev","batel___18","_barrozen_","king_gebeye","maya_leyderman","eden_teveje_a_e","lior2662","shoambenadiva","_yasmin_shimshon_","yuditkabada","tigist_anagawu","shelly.atzbha","sara_tadele","shiranattar","carmelgo","shahardalawey","tal.astrogano_","smadarlevi78walla","jess_icagrm","tahel_evro","no.erica","libby_bekin","jeylafromyourdreams","shir_shulman","dorlevi_photography","lior_rahamim15","esterrm94","shirel_morad1","guy.ben.shushan","lizosigwe","adi_saroya3","raziaco232","tamar_vaknin99","tehila_135","shelly_maslov","daniella_hanukaev","danielle_mashiach","mirav_kabesa","shiran.fatal","_eliya1919_","arieleldar3112","yarin.zhavi","bastiker_nof_lian","shirateharani","haneen_ab_ab","offri.zino","coral_sl_2002","neretvar","hodaya2087","yaellisraell","_ofekdahan","amit.l18","idan.kely","baby__ziv","_ruthadana_","adicohentzemach","emily_tsv","_elina.polinskiy_","gal_assaf","_shirel_2002","tamar_kalifa","dor.r.e.a123","noarodoy","koral_yechezkel","oriya.dahan","dimitra_saponov11","mishel.feklisov","baby_eden1","nehorapaz","danielmozer","kalanit.official","valeria.popov","hoshen_zilberberg_","lior_cohen211","buneoitis","hodaya_basil","lielsubai","adi__chen","shaharaviv1","1keren2","sol.shachar","yael_ploshnik","gilibs99","rotemir_","amitlisha_","sophieloginov","_cohen_maya_","rinxberman","idandebi","adva561","shaharevivo","lotemtessler","sharon.olen","liat_blumenfeld","lilush2804","noa_tsabag","catherine_deneuve_magazines","atasdana","sharvit_hodaya","_nafas__17__","gal.tayeb","lihii.22","hodaya_moyal_","eden_sadon","nikol_9012","avital_vaysbuch","kris_tab24","lenafarber3","fantastikamill","zehave9298","yael_mazarib","michalmis12","sarah.gurevich","amaliya_binyaminov","maayan_or111","efrat_bendavid","maycohen02","dror.huber","shaharsegev","ronit_shneor","adi_koren5","_ofek_b","roni.makeart","shiran__shiran__shiran","sinayziv","danny_ittach","shwshwkhlil","liorholander","dhqbree","shirelerner","shani.tzurdeker","linoy_malka__","hilapeled","natali_yeshayev_new","carolina_f_21","olga3ccc","shirasenyor","alfatlawi_zahra","orit_yehezkel","osnat_gy","michal__bitton","natali.m____","lorenreuven","dorincohen_1","hodaya_gigi","maayanamar140","argaman_sharon","eliyadenur1","__romiomer___","danielkresh","emily_balilty","nicolelevich","shoval_1302","orbovic_stanka","natty872","orian.lasri","shahar_abergel_","shilat08","mayan3.bij","_a.celeste","shira308","zivhadad1662","tehila_nogarker","nechama_weiss","raya.mishayev","natanela_ost_14245","shayli_orielsh22","_shternyd19_","nuria_cohen","ts_miz","batel2121","shiracohen_91","ella_lesar","a.khsvn","1___talia____1","natali_gavrialov","shiran_43","_koral_peretz","nitzan___sharon","sapirdahann","ronymor1","sama.sakaran2016","aviv_b96","lian.potapov","talbiton25","lahan_levit","indie.wardrobe","may.benabu","yuvalmore","_lironbendaniel_","tal.elal","danielhamoo","hadas_gavra1","carin_555","ariela_773","sharona_00","sarit_danino11","kimpresler"];

    // remove all likers for last n(lastPics) pics from "following" array
    following = await removeLikers(page, following, lastPics, user);
    console.log("final result:",JSON.stringify(following));
   
    // last 3:
    // following = ["eden_pinhasov_","lior_habas","grazielly_rosas","eden_zitooni","hadar.shechter","chirahya","shenhav.olario","gaya_.levi","coral_cohen77","morint11","_barlevi__","barellihi","or_chen.e","noy_ohana","liel_guster","rebecca_edri","naamaozery9","shir_6658","yyuvall","sapirnutrition","avital_biton1","rut_st17","zohar_hayon","talotan123","ilana.tesler","liat_yos24","ayelet_moyal","noamtuviana","chenhalevi1997","jessica_klempert","noam___dahan","yuvalperetz6","ariel_vernick","shirkarasenti","shani_ezra","naama2602","noybiton30","elina_tarnopolski","hadar_ben_lulu","lior_momrak","noya.twizer","mazal_levi5","rachliguetta","janet_michaelov","eden.elim","liyaraiz","stav_katan","hodayapaniri315","ifatp999","rufta_hafti_habu","nofarcohen2505","eden_paikin","shir._.2020","morandvir25","sabina.92s","meitar_madarr","shoval.yona","liel.adiv","maayan.shar","edensibi","noy_dahari","rachel_979","sapir13a","_roniofir","yuval_hurgin_fit","sol_bendahan","yae_rom","noy_maman21","yovel_elkoby","ronih4411","nirit_shimon","shirbenmoshe12","naama_krispin1","yuval_pinchas","miika16","nofarraz12","super_solomonov","shai_mashiach","eden.esi","maysoll","hen.atias","oshra.eluz","__yuvalelimelech__","talmazliah","tnyhsyqryts","ainoa_maurot","noamisrael99","themost_eliana","linoyshaday","shahar_samara","roni_malca1","shay_bar_rosenfeld","noy.primat","hadar_atad","topaz_efrati","shanir12","kessembi","raz_uziel","tehilamazor","krdana","shacharfanish","noamraviv1","omerzilberman","shiran_castro","noam_levii_","danielamran","yuvaledry","eden_245","hagareitam","hila.cohen41","sahar_edri1","shai_knafo156","adi.jacob","hani_aslan1","einav_adoni","ben_david_yuval","edenh23","imbar_mizrachi","liorkaaa","shelly_zibenberg","tzlilrogel","yaara_even","ofir.moshe","or_salman13","x_nastia_18","sapir252","osher_cohen_765","rotem.k7","meshi_mahtabi","nicole.pond","shoval_menashe","almogshmuel35","yovel_dayan","shellys97","bar_kakov","yulia_matlyuk","inbar_torres_","yael__biton","noy_abutbul2","may_cohen20","may_goldin","shakedpollak_","_tanya_m5","adimaor55","levin.adar","melis_malki","a.nastasia3","alice_dratch","tali_feldman_","yael_kazakov","nofa05256","avital_michaelov","gayacooper","just._.liza1","daniellosh223","sabrina_kirillov","johanna2626_","alisya_davidov","shirarachamim","edenmalka5","koral__m","liraz_b1","shirozer12318","chaya_94","maayanderi_","ronlevi32","shaharsinai","shoham_cohen5","altdats","hilako1122","ayelet_gopshten1","shirachdut75","rachelkasa1234","helen97_g","barkaylevi","batel___18","_barrozen_","maya_leyderman","eden_teveje_a_e","lior2662","shoambenadiva","_yasmin_shimshon_","yuditkabada","shelly.atzbha","shiranattar","shahardalawey","tal.astrogano_","smadarlevi78walla","no.erica","jeylafromyourdreams","dorlevi_photography","lior_rahamim15","lizosigwe","adi_saroya3","tamar_vaknin99","daniella_hanukaev","danielle_mashiach","_eliya1919_","shirateharani","coral_sl_2002","hodaya2087","emily_tsv","_elina.polinskiy_","gal_assaf","dor.r.e.a123","oriya.dahan","baby_eden1","danielmozer","kalanit.official","hoshen_zilberberg_","buneoitis","sophieloginov","rinxberman","idandebi","shaharevivo","lotemtessler","atasdana","_nafas__17__","gal.tayeb","hodaya_moyal_","kris_tab24","lenafarber3","fantastikamill","zehave9298","michalmis12","sarah.gurevich","efrat_bendavid","dror.huber","_ofek_b","sinayziv","shwshwkhlil","shani.tzurdeker","hilapeled","natali_yeshayev_new","carolina_f_21","shirasenyor","alfatlawi_zahra","orit_yehezkel","natali.m____","maayanamar140","eliyadenur1","nicolelevich","shoval_1302","orbovic_stanka","shilat08","mayan3.bij","shira308","zivhadad1662","tehila_nogarker","raya.mishayev","natanela_ost_14245","shayli_orielsh22","_shternyd19_","a.khsvn","1___talia____1","shiran_43","sama.sakaran2016","lian.potapov","lahan_levit","indie.wardrobe","may.benabu","yuvalmore","tal.elal","danielhamoo","carin_555","ariela_773","sharona_00","kimpresler"];
    // last 11:
// following = ["eden_pinhasov_","lior_habas","grazielly_rosas","eden_zitooni","hadar.shechter","chirahya","shenhav.olario","gaya_.levi","morint11","_barlevi__","barellihi","or_chen.e","noy_ohana","liel_guster","rebecca_edri","naamaozery9","shir_6658","yyuvall","sapirnutrition","avital_biton1","rut_st17","zohar_hayon","talotan123","liat_yos24","ayelet_moyal","noamtuviana","chenhalevi1997","jessica_klempert","noam___dahan","yuvalperetz6","ariel_vernick","shirkarasenti","shani_ezra","naama2602","noybiton30","elina_tarnopolski","lior_momrak","noya.twizer","mazal_levi5","rachliguetta","janet_michaelov","eden.elim","liyaraiz","stav_katan","hodayapaniri315","ifatp999","rufta_hafti_habu","nofarcohen2505","eden_paikin","shir._.2020","morandvir25","sabina.92s","meitar_madarr","shoval.yona","liel.adiv","maayan.shar","edensibi","noy_dahari","rachel_979","sapir13a","_roniofir","yuval_hurgin_fit","sol_bendahan","yae_rom","noy_maman21","yovel_elkoby","ronih4411","nirit_shimon","shirbenmoshe12","naama_krispin1","yuval_pinchas","nofarraz12","shai_mashiach","eden.esi","maysoll","hen.atias","oshra.eluz","__yuvalelimelech__","talmazliah","tnyhsyqryts","ainoa_maurot","noamisrael99","themost_eliana","linoyshaday","shahar_samara","roni_malca1","noy.primat","hadar_atad","topaz_efrati","shanir12","kessembi","raz_uziel","tehilamazor","krdana","shacharfanish","noamraviv1","omerzilberman","shiran_castro","noam_levii_","danielamran","yuvaledry","eden_245","hagareitam","hila.cohen41","sahar_edri1","shai_knafo156","adi.jacob","hani_aslan1","einav_adoni","ben_david_yuval","edenh23","imbar_mizrachi","liorkaaa","shelly_zibenberg","tzlilrogel","yaara_even","ofir.moshe","or_salman13","x_nastia_18","sapir252","osher_cohen_765","rotem.k7","meshi_mahtabi","nicole.pond","shoval_menashe","almogshmuel35","yovel_dayan","bar_kakov","yulia_matlyuk","inbar_torres_","yael__biton","noy_abutbul2","may_cohen20","may_goldin","shakedpollak_","_tanya_m5","adimaor55","levin.adar","melis_malki","a.nastasia3","alice_dratch","tali_feldman_","yael_kazakov","avital_michaelov","gayacooper","just._.liza1","daniellosh223","sabrina_kirillov","johanna2626_","alisya_davidov","shirarachamim","edenmalka5","koral__m","liraz_b1","shirozer12318","chaya_94","maayanderi_","ronlevi32","shaharsinai","altdats","hilako1122","ayelet_gopshten1","shirachdut75","rachelkasa1234","helen97_g","barkaylevi","batel___18","_barrozen_","maya_leyderman","eden_teveje_a_e","lior2662","shoambenadiva","_yasmin_shimshon_","yuditkabada","shelly.atzbha","shiranattar","shahardalawey","tal.astrogano_","smadarlevi78walla","no.erica","jeylafromyourdreams","dorlevi_photography","lior_rahamim15","lizosigwe","adi_saroya3","daniella_hanukaev","danielle_mashiach","_eliya1919_","coral_sl_2002","hodaya2087","emily_tsv","_elina.polinskiy_","gal_assaf","dor.r.e.a123","oriya.dahan","baby_eden1","danielmozer","kalanit.official","sophieloginov","rinxberman","shaharevivo","lotemtessler","atasdana","_nafas__17__","gal.tayeb","kris_tab24","lenafarber3","fantastikamill","zehave9298","michalmis12","efrat_bendavid","dror.huber","_ofek_b","sinayziv","shwshwkhlil","shani.tzurdeker","carolina_f_21","shirasenyor","alfatlawi_zahra","orit_yehezkel","maayanamar140","eliyadenur1","nicolelevich","shoval_1302","shilat08","tehila_nogarker","raya.mishayev","shayli_orielsh22","_shternyd19_","a.khsvn","1___talia____1","shiran_43","sama.sakaran2016","lian.potapov","lahan_levit","indie.wardrobe","may.benabu","yuvalmore","tal.elal","carin_555","ariela_773"];
    // mute remaining
    // await mute(page, following);

}

async function mute(page, following) {
let idAPI= await fetch("https://www.instagram.com/web/search/topsearch/?query=meme.platter", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "upgrade-insecure-requests": "1",
      "cookie": "ig_did=D43170AC-FF4A-43FF-A3ED-ACC73835938F; mid=X6R_iAAEAAHCzX0Gb8P53K1ehG6A; ig_nrcb=1; csrftoken=RQwGXGa7WIiEfJfMnYJdRihpDEHxfVh1; ds_user_id=2039000713; sessionid=2039000713%3AIEBk5rkxnUQcoz%3A13; shbid=13883; shbts=1604616077.3963385; rur=RVA; urlgen=\"{\\\"79.182.95.174\\\": 8551}:1kao3V:hTDreM61M9lNW6ZzvMggfFxOOJo\""
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });
let id =await idAPI.json();
id=id.users[0].user.pk;
console.log(id);

    let test= await fetch("https://www.instagram.com/web/friendships/"+id+"/mute-posts/", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "application/x-www-form-urlencoded",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-csrftoken": "AIHnL4Zn5wOwrwp60Ua7zcIZhmSaegRH",
    "x-ig-app-id": "936619743392459",
    "x-ig-www-claim": "hmac.AR12QQL4GSEmsJqLBG3un89czqUU97_HeMloXdpwQlX-QPot",
    "x-instagram-ajax": "0cf715af355e",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "ig_did=112A87F5-343F-495D-B9E2-886E47D3B285; mid=X6QuagAEAAH1m8ESicDxSvgH1Fli; ig_nrcb=1; csrftoken=AIHnL4Zn5wOwrwp60Ua7zcIZhmSaegRH; ds_user_id=2039000713; sessionid=2039000713%3Aw8WRdS8xq2QjRl%3A22; shbid=13883; shbts=1604595312.4234724; rur=RVA; urlgen=\"{\\\"77.127.63.227\\\": 9116\\054 \\\"79.182.95.174\\\": 8551}:1kanrr:izyaFMdnoOiIg38CcVIUHnx6ooY\""
  },
  "referrer": "https://www.instagram.com/meme.platter/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "POST",
  "mode": "cors"
});
// console.log(test);
}

async function removeLikers(page, following, lastPics, usr) {
    await page.waitForTimeout(3000);

    await page.goto('https://www.instagram.com/' + usr);

    await page.waitForSelector('#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1)');
    //loaded
    // "#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child("+(index/3+1)+") > div:nth-child("+(index%3+1)+") > a"
    //axtract all picture ids...
    await page.waitForTimeout(3000);

    let body = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(body);
    for (let index = 0; index < lastPics; index++) {
        let row = Math.floor(index/3+1)
        console.log("SELECTOR","#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child("+row+") > div:nth-child("+(index%3+1)+") > a");
        let href = $("#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child("+row+") > div:nth-child("+(index%3+1)+") > a", body).attr('href');
        console.log("href",href);
        let hrefArr = href.split('/');
        console.log("pic code:", hrefArr[2]);
        let pic_code=hrefArr[2];

        let likers = [];
        let has_next_page = true; //true
        let pre_cursor="";
        let post_cursor = "";
        let end_cursor = "";
        while (has_next_page) {
            console.log("1. end_cursor",end_cursor);
    
            let likersAPI = await fetch("https://www.instagram.com/graphql/query/?query_hash=d5d763b1e2acf209d62d22d184488e57&variables=%7B%22shortcode%22%3A%22"+pic_code+"%22%2C%22include_reel%22%3Atrue%2C%22first%22%3A50"+pre_cursor+end_cursor+post_cursor+"%7D", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-csrftoken": "k2akvzCcuROS3H6iQHeCMw2O5eZoZNuS",
                    "x-ig-app-id": "936619743392459",
                    "x-ig-www-claim": "hmac.AR12QQL4GSEmsJqLBG3un89czqUU97_HeMloXdpwQlX-QFsu",
                    "x-requested-with": "XMLHttpRequest",
                    "cookie": "ig_did=4B244661-EA60-41CF-B182-4CCCAF811831; mid=X6PHhwAEAAHpibgHNMMfH4zZdy9K; ig_nrcb=1; csrftoken=k2akvzCcuROS3H6iQHeCMw2O5eZoZNuS; ds_user_id=2039000713; sessionid=2039000713%3A5ZTrqPy4yQW0iS%3A17; shbid=13883; shbts=1604504087.1975956; rur=RVA; urlgen=\"{\\\"77.127.63.227\\\": 9116}:1kaKyK:-P6D_vSL1dK_LsekA1UIjCrvoRo\""
                },
                "referrer": "https://www.instagram.com/p/CG9VRdBssSb/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors"
            });
            //may change: x-csrftoken, x-ig-www-claim, cookie:x-csrftoken, ig_did,sessionid, urlgen
            

            let data = await likersAPI.json();
            data.data.shortcode_media.edge_liked_by.edges.forEach((item) => {
                console.log(item.node.username);
                likers.push(item.node.username)
                
                let index_of = following.indexOf(item.node.username);
                if (index_of > -1) {
                    following.splice(index_of, 1);
                }
                

                return 1;
            });
            has_next_page = data.data.shortcode_media.edge_liked_by.page_info.has_next_page;
            console.log("has_next_page" , has_next_page);
            end_cursor = data.data.shortcode_media.edge_liked_by.page_info.end_cursor;
            pre_cursor="%2C%22after%22%3A%22";
            post_cursor = "%22";
    
            console.log("end_cursor",end_cursor);
            // loop to search following array for
    
            console.log("following", following);
            console.log("likers", likers);
            console.log("last liker:", likers[likers.length-1]);
            
    
        }
        console.log(index,". result following", JSON.stringify(following));

        
    }

    return following;

    // await page.click('#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1)');
    
}

async function login(page, usr, pass) {
    await page.goto('https://www.instagram.com/');

    //LOGIN
    await page.waitForSelector('[name="username"]');
    await page.type('[name="username"]', usr);

    await page.waitForSelector('div.-MzZI:nth-child(2) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)');
    await page.type('div.-MzZI:nth-child(2) > div:nth-child(1) > label:nth-child(1) > input:nth-child(2)', pass);

    await page.waitForSelector('.L3NKy > div:nth-child(1)');
    await page.click('.L3NKy > div:nth-child(1)');
}

async function check_following(browser) {
    //check how many bitches you following
    const page2 = await browser.newPage();
    await page2.goto('https://www.instagram.com/' + process.env.NAME);
    let body = await page2.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(body);

    $('#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > span', body).each(function () {
        bitchCount = $(this).text();
        console.log("bitch count: ", bitchCount);
        page2.close();

    })
}

async function getAllFollowing(page) {
    var bitches = [];

    // goto settings
    await page.waitForSelector('span.qNELH > img:nth-child(1)');
    await page.click('span.qNELH > img:nth-child(1)');

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    // privacy
    await page.waitForSelector('#react-root > section > main > div > ul > li:nth-child(7) > a');
    await page.click('#react-root > section > main > div > ul > li:nth-child(7) > a');

    // data
    await page.waitForSelector('#react-root > section > main > div > article > main > section:nth-child(6) > a');
    await page.click('#react-root > section > main > div > article > main > section:nth-child(6) > a');

    // // following 
    await page.waitForSelector('#react-root > section > main > div > article > main > div > div:nth-child(2) > section:nth-child(1) > section:nth-child(4) > a');
    await page.click('#react-root > section > main > div > article > main > div > div:nth-child(2) > section:nth-child(1) > section:nth-child(4) > a');



    // show more...
    var bool = true;
    while (bool) {
        try {
            await page.waitForSelector('#react-root > section > main > div > article > main > button');
            // delete throw
            // throw 'Intentional error.';
            await page.click('#react-root > section > main > div > article > main > button');
        } catch (error) {
            console.error(error);
            // stops in case of error
            bool = false;
            // push all bitches
            let body = await page.evaluate(() => document.body.innerHTML);
            const $ = cheerio.load(body);
            $('#react-root > section > main > div > article > main > section > div', body).each(function () {
                let name = $(this).text();
                console.log(name);
                bitches.push(name);
            })
        }
        page.evaluate(_ => {
            window.scrollBy(0, 50);
        });
        let body = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(body);
        let bitchesShown = $('#react-root > section > main > div > article > main > section > div', body).length;
        console.log("Reached: ", bitchesShown);
        if (bitchesShown >= bitchCount) {
            console.log('done.')
            // push all bitches
            $('#react-root > section > main > div > article > main > section > div', body).each(function () {
                let name = $(this).text();
                console.log("bitch: ", name);
                bitches.push(name);

            })
            // stops if all are shown
            bool = false;
        }
    }
    return bitches;

}

