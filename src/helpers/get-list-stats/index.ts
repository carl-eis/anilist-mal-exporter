import { AnimeListResponse } from '../../interfaces/anime-list';

export default (response: AnimeListResponse): void => {
  const { data: { MediaListCollection: { lists } } } = response;
  const stats = lists.reduce((allLists, currentList) => {
    return [
      ...allLists,
      {
        name: currentList.name,
        amount: currentList.entries.length
      }
    ];
  }, new Array());

  console.log('\nList Stats:');
  for (const list of stats) {
    console.log(`${list.name}: ${list.amount}`);
  }
  console.log('\n');
}
