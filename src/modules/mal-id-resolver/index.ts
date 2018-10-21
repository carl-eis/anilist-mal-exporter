/*============================================================================
 Anilist Exporter
 ============================================================================*/

import fs from 'fs';
import { RateLimiter } from 'limiter';
import xml2js, { parseString } from 'xml2js';
import * as mal from './mal_lookup';

const limiter = new RateLimiter(1, 3000);


/*============================================================================
 Initialization
 ============================================================================*/

const parseCallback = (error, result) => {
  let callsRemaining = result.myanimelist.anime.length;
  console.log('	This app will run for ' + (callsRemaining * 3 / 60) + ' minutes. Grab a coffee!');

  const extraInfo = `	This is due to the way MAL limits requests.
	You may only make one request per three seconds, and we need to get every single ID
	for all your anime in your list.

	Be grateful you don't have to do this by hand! The first time I used this, I didn't have
	an automatic script, so it took me about an hour.

	Your output will be written to ./datafiles/conversion.xml when it is complete.

    `;

  console.log(extraInfo);

  const tempResult = result;
  const fails: any[] = [];

  for (const i in result.myanimelist.anime) {

    limiter.removeTokens(1, () => {
      console.log('Working on: ' + (parseInt(i, 10) + 1));
      console.log('Title: ' + result.myanimelist.anime[i].series_title[0] + '\n');
      const searchTerm: string = result.myanimelist.anime[i].series_title[0];

      mal.fetchId(searchTerm)
        .then(data => {
          --callsRemaining;

          if (data !== undefined) {
            console.log('DATA RECEIVED: ' + data);
            tempResult.myanimelist.anime[i].series_animedb_id = data;
            console.log('ID: ' + tempResult.myanimelist.anime[i].series_animedb_id);
            console.log('TITLE: ' + tempResult.myanimelist.anime[i].series_title[0] + '\n\n');
          }

          if (data === 'REPLACE_ME') {
            fails.push(tempResult.myanimelist.anime[i].series_title[0]);
          }

          if (callsRemaining <= 0) {
            // all data is here now
            // look through the returnedData and do whatever processing
            // you want on it right here
            const builder = new xml2js.Builder();
            const xml = builder.buildObject(tempResult);

            fs.writeFile('./datafiles/conversion.xml', xml, () => {
              console.log('FILE WRITTEN!');
              console.log('There are ' + fails.length + ' failed items, for which there are no names. Printing list...\n');

              fails.sort();

              if (fails.length) {
                for (const j in fails) {
                  console.log('- ' + fails[j]);
                }
              }

              console.log('\n\nYou may want to go and add these ID\'s in manually, ' +
                'or they will not show up in your list.\n\n');
            });
          }
        })
        .catch(ex => {
          --callsRemaining;
        });
    });
  }
};

const MAIN_XML = fs.readFileSync('./datafiles/anilist.xml');
parseString(MAIN_XML, parseCallback);

