/*============================================================================
 Anilist Exporter
 ============================================================================*/
let unirest = require("unirest");
const fs = require("fs");
const mal = require("./components/mal_lookup");
const parseString = require('xml2js').parseString;
const xml2js = require("xml2js");
const RateLimiter = require('limiter').RateLimiter;
const limiter = new RateLimiter(1, 3000);

/*============================================================================
 Hacks
 ============================================================================*/
String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.split(search).join(replacement);
};

/*============================================================================
 Initialization
 ============================================================================*/

let MAIN_XML = fs.readFileSync("./datafiles/anilist.xml");
let MAIN_ARRAY = parseString(MAIN_XML, function(error, result){

    let callsRemaining = result.myanimelist.anime.length;
    console.log("	This app will run for " + (callsRemaining * 3 / 60) + " minutes. Grab a coffee!");

    let extraInfo = `	This is due to the way MAL limits requests.
	You may only make one request per three seconds, and we need to get every single ID
	for all your anime in your list.

	Be grateful you don't have to do this by hand! The first time I used this, I didn't have 
	an automatic script, so it took me about an hour.

	Your output will be written to ./datafiles/conversion.xml when it is complete.

    `;

    console.log(extraInfo);
    let tempResult = result;
    let fails = [];

    for (let i in result.myanimelist.anime){

        limiter.removeTokens(1, function() {
            console.log("Working on: " + (parseInt(i) + 1));
            console.log("Title: " + result.myanimelist.anime[i].series_title[0] + "\n");

            mal.lookupId(result.myanimelist.anime[i].series_title[0], function(data){

                --callsRemaining;

                if (data !== undefined){
                    console.log("DATA RECEIVED: " + data);
                    tempResult.myanimelist.anime[i].series_animedb_id = data;
                    console.log("ID: " + tempResult.myanimelist.anime[i].series_animedb_id);
                    console.log("TITLE: " + tempResult.myanimelist.anime[i].series_title[0] + "\n\n");
                }
                if (data === "REPLACE_ME"){
                    fails.push(tempResult.myanimelist.anime[i].series_title[0]);
                }

                if (callsRemaining <= 0) {
                    // all data is here now
                    // look through the returnedData and do whatever processing
                    // you want on it right here
                    let builder = new xml2js.Builder();
                    let xml = builder.buildObject(tempResult);

                    fs.writeFile("./datafiles/conversion.xml", xml, function(){
                        console.log("FILE WRITTEN!");

                        console.log("There are " + fails.length + " failed items, for which there are no names. Printing list...\n");

                        fails.sort();

                        if (fails.length > 0){
                            for (let j in fails){
                                console.log("- " + fails[j]);
                            }
                        }
                        console.log("\n\nYou may want to go and add these ID's in manually, " +
                            "or they will not show up in your list.\n\n");
                    })
                }
            })
        });



    }



    // console.log(JSON.stringify(result, null, 4));
    // fs.writeFile("./datafiles/conversion.json", JSON.stringify(result, null, 4), function(){
    // 	console.log("FILE WRITTEN!");
    // })
});

/*============================================================================
 Main Functions
 ============================================================================*/


function halt(callback){
    setTimeout(callback, 5000);
}

function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}