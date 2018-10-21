import axios, { AxiosRequestConfig } from 'axios';
import { AnimeListResponse } from '../../interfaces/anime-list';
import query from '../queries/ts-files/anime-list';

export default async (id: number): Promise<AnimeListResponse> => {
  console.log(`Fetching anime list...`);
  const url = 'https://graphql.anilist.co';

  const variables = {
    id,
    listType: 'ANIME'
  };

  const config: AxiosRequestConfig = {
    url,
    headers: {
      'postman-token': '20a64b56-6b83-b159-d7f7-d22acce0920a',
      'cache-control': 'no-cache'
    },
    method: 'POST',
    data: {
      query,
      variables
    }
  };

  const response = (await axios(config)).data;
  console.log(`List fetch successful!`);
  return response;
};
