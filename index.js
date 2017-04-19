/*============================================================================
    Anilist Exporter
 ============================================================================*/
let unirest = require("unirest");
const fs = require("fs");

/*============================================================================
    Globals
 ============================================================================*/

let ANILIST_AUTH = {};
let MAIN_LIST = [];
let GLOBAL_XML = "";

let CONFIG = require("./config.json");

let XML_PART_1 = `<?xml version="1.0" encoding="UTF-8" ?>
		
		<myanimelist>
		
			<myinfo>
				<user_id>${CONFIG.MAL_USER_ID}</user_id>
				<user_name>${CONFIG.MAL_USER_NAME}</user_name>
				<user_export_type>1</user_export_type>
			</myinfo>
		
				
`;

let XML_END = `
            </myanimelist>
	        		
`;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

/*============================================================================
    Query
 ============================================================================*/

function createAuthRequest(success, error){
    let req = unirest("POST", "https://anilist.co/api/auth/access_token");

    req.query({
        "grant_type": "client_credentials",
        "client_id": CONFIG.ANILIST_CLIENT_ID,
        "client_secret": CONFIG.ANILIST_CLIENT_SECRET
    });

    req.headers({
        "postman-token": "20a64b56-6b83-b159-d7f7-d22acce0920a",
        "cache-control": "no-cache"
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
        success(res.body);
    });
}



/*============================================================================
    Actual Post
 ============================================================================*/

function getAnimeList(){
    createAuthRequest(function(auth){
        let req = unirest("GET", "https://anilist.co/api/user/" + CONFIG.ANILIST_USER_DISPLAY_NAME + "/animelist");

        req.query({
            //Nothing to do here :D
        });

        req.headers({
            "Authorization": auth.token_type + " " + auth.access_token
        });


        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            processList(res.body.lists);
        });
    })
}

function processList(lists){
    for (let i in lists){
        //For each list
        for (let j in lists[i]){
            //For every item in the list

            let pushObj = {
                "name_eng" : lists[i][j].anime.title_english,
                "list_status" : processWatchStatus(lists[i][j].list_status),
                "score" : Math.floor(lists[i][j].score),
                "episodes_watched" : lists[i][j].episodes_watched,
                "comments" : lists[i][j].notes || "",
                "num_max_episodes" : lists[i][j].anime.total_episodes,
                "times_watched" : calcTimesWatched(lists[i][j].anime.total_episodes, lists[i][j].episodes_watched)
            };

            function calcTimesWatched(max, watched){
                if (watched.toString() === max.toString()){
                    return 1;
                } else{
                    return 0;
                }
            }


            let pushXML = `
                <anime>
                    <series_animedb_id>REPLACE_ME</series_animedb_id>
                    <series_title><![CDATA[${pushObj.name_eng}]]></series_title>
                    <my_score>${pushObj.score}</my_score>
                    <my_status>${pushObj.list_status}</my_status>
                    <my_comments><![CDATA[${pushObj.comments}]]></my_comments>
                    <my_watched_episodes>${pushObj.episodes_watched}</my_watched_episodes>
                    <my_times_watched>${pushObj.times_watched}</my_times_watched>
                    <update_on_import>1</update_on_import>
                    <series_episodes>24</series_episodes>
                </anime>
            `;

            MAIN_LIST.push(pushObj);

            GLOBAL_XML += "\n" + pushXML;
        }
    }
    fs.writeFile("datafiles/anilist.json", prettify(MAIN_LIST), {"create" : true}, function(){
        console.log("DONE!");
    });

    fs.writeFile("datafiles/anilist.xml", XML_PART_1 + GLOBAL_XML + XML_END, {"create" : true}, function(){
        console.log("... AND DONE!");
    })
}


function prettify(input){
    return JSON.stringify(input, null, 4);
}

// function capitalize(input){
//     return "" + input.toString().charAt(0).toUpperCase() + input.toString().substring(1);
// }

// function capitalizeAll(input){
//     let newArr = [];

//     for (i in input){
//         if (input[i].toLowerCase().includes("to")){

//         } else{
//             newArr.push(capitalize(input[i]));
//         }
//     }

//     return newArr;
// }

function processWatchStatus(input){
    // let splitArray = [];
    // let returnMe = "";

    // if (input.includes(" ")){
    //     splitArray = input.split(" "); 
    //     splitArray = capitalizeAll(splitArray);
    //     splitArray = splitArray.join(" ");
    // } 
    // if (input.includes("-")){
    //     splitArray = input.split("-"); 
    //     splitArray = capitalizeAll(splitArray);
    //     splitArray = splitArray.join("-");
    // }

    // returnMe = splitArray;
    // return returnMe;
    input = input.replaceAll("plan to watch", "Plan to Watch");
    input = input.replaceAll("on-hold", "On-Hold");
    input = input.replaceAll("dropped", "Dropped");
    input = input.replaceAll("completed", "Completed");

    return input;
}

var str = "Hello world, welcome to the universe.";
var n = str.includes("world");

/*============================================================================
    Run
 ============================================================================*/

getAnimeList();