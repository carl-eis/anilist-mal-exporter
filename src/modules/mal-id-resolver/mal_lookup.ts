/*============================================================================
    MAL Lookup Module
 ============================================================================*/
import axios, { AxiosRequestConfig } from 'axios';
import unirest from 'unirest';
import xml2js from 'xml2js';
import CONFIG from '../../config/config.json';

import querystring, { stringify } from 'querystring';

/*============================================================================
    Functions
 ============================================================================*/

const createBasicAuth = () => {
  const encString = CONFIG.MAL_USER_NAME + ':' + CONFIG.MAL_USER_PASSWORD;
  const authString = 'Basic ' + (new Buffer(encString).toString('base64'));
  console.log('debug: auth: ' + authString);
  return authString;
};

export const fetchId = async (searchTerm: string): Promise<any> => {
  const url = 'https://myanimelist.net/api/anime/search.xml';
  const query = stringify({
    'q': searchTerm
  });
  const config: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      'postman-token': 'a7d39765-bb44-9985-3c45-ae0545aacf51',
      'cache-control': 'no-cache',
      'authorization': createBasicAuth()
    },
    data: query,
    url,
  };
  console.log(config);
  return axios(config)
    .then(({ data }) => {
      console.log('response: ', data);
      xml2js.parseString(data, (err, result) => {
        if (err) {
          console.log(err);
        }
        // console.log("PRINTING RAW: " + JSON.stringify(json, null, 4));
        if (result === undefined) {
          console.log('unable to fetch id!!!');
          return Promise.resolve(('REPLACE_ME'));
        } else {
          return Promise.resolve((result.anime.entry[0].id));
        }
      });
    });
};
