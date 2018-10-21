export * from './lib/async';
export * from './lib/hash';
export * from './lib/number';

import fs from 'fs';
import CONFIG from './config/config.json';
import { getListStats, write } from './helpers/';
import { AnimeListResponse } from './interfaces/anime-list';
import { getList, getUserId, processList } from './modules';

const main = async () => {
  try {
    const userId: number = await getUserId(CONFIG.ANILIST_USER_DISPLAY_NAME);
    const animeListResponse: AnimeListResponse = await getList(userId);

    write(animeListResponse, 'response');
    getListStats(animeListResponse);

    const XML_LIST = processList(animeListResponse);

    // @ts-ignore
    fs.writeFile("datafiles/anilist.xml", XML_LIST, { create: true }, (ex) => {
      if (ex) { console.log(ex) }
    })

  } catch (ex) {
    console.log('failed to fetch list.');
    write(ex, 'error', true);
    if (ex.response && ex.response.data) {
      console.log(ex.response.data);
    }
  }

};

main();
