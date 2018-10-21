import fs from 'fs';
import CONFIG from '../../config/config.json';
import { replaceAll } from '../../helpers';
import { AnimeListResponse } from "../../interfaces/anime-list";


const XML_PART_1 = `<?xml version="1.0" encoding="UTF-8" ?>

		<myanimelist>

			<myinfo>
				<user_id>${CONFIG.MAL_USER_ID}</user_id>
				<user_name>${CONFIG.MAL_USER_NAME}</user_name>
				<user_export_type>1</user_export_type>
			</myinfo>


`;

const XML_END = `</myanimelist>`;

// const calcTimesWatched = (max, watched) => {
//   if (watched.toString() === max.toString()) {
//     return 1;
//   } else {
//     return 0;
//   }
// };

const processWatchStatus = (input) => {
  let newInput = input;
  newInput = replaceAll(input, 'plan to watch', 'Plan to Watch');
  newInput = replaceAll(input, 'on-hold', 'On-Hold"');
  newInput = replaceAll(input, 'dropped', 'Dropped');
  newInput = replaceAll(input, 'completed', 'Completed');
  return newInput;
};

const createListEntry = (currentList, jsonList) => (allEntries, currentEntry) => {
  const entryObject = {
    "name_eng": currentEntry.media.title.userPreferred,
    "list_status": processWatchStatus(currentList.name),
    "score": Math.floor(currentEntry.score),
    "episodes_watched": currentEntry.progress,
    "comments": currentEntry.notes,
    // "num_max_episodes": lists[i][j].anime.total_episodes,
    // "times_watched": calcTimesWatched(lists[i][j].anime.total_episodes, lists[i][j].episodes_watched)
  };
  const entryXML = `
    <anime>
        <series_animedb_id>REPLACE_ME</series_animedb_id>
        <series_title><![CDATA[${entryObject.name_eng}]]></series_title>
        <my_score>${entryObject.score}</my_score>
        <my_status>${entryObject.list_status}</my_status>
        <my_comments><![CDATA[${entryObject.comments}]]></my_comments>
        <my_watched_episodes>${entryObject.episodes_watched}</my_watched_episodes>
        <update_on_import>1</update_on_import>
        <series_episodes>24</series_episodes>
    </anime>
  `;

  jsonList.push(entryObject);

  // <my_times_watched>${entryObject.times_watched}</my_times_watched>
  return [
    ...allEntries,
    entryXML
  ];
};

export default (response: AnimeListResponse): string => {
  const JSON_LIST = new Array();
  const { data: { MediaListCollection: { lists } } } = response;

  const XMLEntryArray: string[] = lists.reduce((accumulator, currentList) => {
  const flattenedLists = currentList.entries.reduce(createListEntry(currentList, JSON_LIST), new Array());
    return [
      ...accumulator,
      ...flattenedLists,
    ]
  }, new Array());

  fs.writeFile("datafiles/anilist.json", JSON.stringify(JSON_LIST, null, 2), (ex) => {
    if (ex) { console.log(ex); }
  });

  return `${XML_PART_1}${XMLEntryArray.join('\n\n')}${XML_END}`;
}
