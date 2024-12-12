// // src/api/stocksApi.ts
// import axios from 'axios';
// import { TickerResponse } from '../hooks/use-stocks';

// const BASE_URL = 'https://api.polygon.io/v3/reference';

// export const fetchTickera = async ({query = '' , cursor = ""}) => {
//   const response = await axios.get< TickerResponse>(`${BASE_URL}/tickers`, {
//     params: { ticker: query , cursor},
//     headers: {
//     Authorization: 'Bearer ZA4TlbobR5JqIT4H6JKaPA_AdHPn8p3Z',
//  },
//   });

//   return response.data; // Expected response: { data: Stock[], nextPage: number | null }
// };


// src/api/stocksApi.ts
import axios from 'axios';
export const fetchTickers = async ({ pageParam = '', queryParams = {} }) => {
  // Base API endpoint
  const baseUrl = 'https://api.polygon.io/v3/reference/tickers';

  // Construct query string from queryParams object
  const params = new URLSearchParams({
    ...queryParams,
    cursor: pageParam || '', // Add cursor for pagination
  });
  console.log(`${baseUrl}?${params.toString()}`);
  // Make the API request
  const response = await axios.get(`${baseUrl}?${params.toString()}`,{ headers: {
    Authorization: 'Bearer ZA4TlbobR5JqIT4H6JKaPA_AdHPn8p3Z',
 },});
  // console.log(response.data, "from here");
  return response.data;
};
