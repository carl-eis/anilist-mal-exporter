import axios, { AxiosRequestConfig } from 'axios';
import query from '../queries/ts-files/get-user';

export default async (name: string): Promise<number> => {
  console.log(`fetching user ID for "${name}"...`);

  const url = 'https://graphql.anilist.co';

  const variables = {
    name
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
  const { data: { User: { id } } } = response;
  console.log(`Found ID: ${id}`);
  return id;
};
