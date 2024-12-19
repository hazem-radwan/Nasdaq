import axios from 'axios';

const baseUrl = 'https://dummyjson.com/recipes';

export const getRecipesAPI = async (limit: number, skip: number) => {
  const data = axios.get(baseUrl, {
    params: {
      limit,
      skip,
    },
  });
  return data;
};

export const searchRecipesAPI = async (query: string) => {
  const data = axios.get(`${baseUrl}/search`, {
    params: {
      q: query,
    },
  });
  return data;
};
