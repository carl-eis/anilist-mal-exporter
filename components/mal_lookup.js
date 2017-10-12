/*============================================================================
    MAL Lookup Module
 ============================================================================*/
let unirest = require("unirest");
const fs = require("fs");
const CONFIG = require("../config.json");
const xml2js = require("xml2js");

/*============================================================================
    Functions
 ============================================================================*/

function main(){

}

function lookupId(input, callback){
    callback("11111");
}

function lookupIdES5(input, callback){
    let req = unirest("GET", "https://myanimelist.net/api/anime/search.xml");

    req.query({
        "q": input
    });

    req.headers({
        "postman-token": "a7d39765-bb44-9985-3c45-ae0545aacf51",
        "cache-control": "no-cache",
        "authorization": createBasicAuth()
    });

    req.end(function (res) {
        if (res.error) {
            console.log("mal lookup: error: " + res.error);
        }
            //throw new Error(res.error);

        // console.log(res.body);
        xml2js.parseString(res.body, (err, result) => {
            if (err) {
                console.log(err);
            }
            let json = result;
            // console.log("PRINTING RAW: " + JSON.stringify(json, null, 4));
            if (result === undefined){
                console.log("unable to fetch id!!!");
                callback("REPLACE_ME");
            } else{
                callback(result.anime.entry[0].id);
            }
        });
    });
}

function createBasicAuth(){
    // console.log(new Buffer("Hello World").toString('base64'));

    let encString = CONFIG.MAL_USER_NAME + ":" + CONFIG.MAL_PASSWORD;
    let authString = "Basic " + (new Buffer(encString).toString('base64'));
    console.log("debug: auth: " + authString);
    return authString;
}

module.exports = {
    lookupId: lookupIdES5
};