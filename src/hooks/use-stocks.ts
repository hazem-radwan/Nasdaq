// src/hooks/useStocks.ts
import { fetchTickers } from '../api/tickers-api';
import { useInfiniteQuery } from '@tanstack/react-query';


export type Ticker = {
      active: boolean,
      cik: string,
      composite_figi: string,
      currency_name: string,
      last_updated_utc: string,
      locale: string,
      market: string,
      name: string,
      primary_exchange: string,
      share_class_figi: string,
      ticker: string,
      type: string
    }
export type TickerResponse ={
  count: number,
  next_url?: string ,
  request_id: string,
  results: Ticker[],
  status: string
}

export type TickerParams = {queryParams? : {ticker?:string}, cursor?: string}

export const useTickersQuery = ({cursor , queryParams} : TickerParams) => {
  return useInfiniteQuery({
  queryKey: ['tickers', queryParams],
  queryFn: () => fetchTickers({pageParam :cursor , queryParams}),
  initialPageParam : '',
  getNextPageParam: (lastPage,_,lastPageParam) => {
    const nextPage = lastPage?.next_url?.split('=')?.[1];
    console.log(nextPage, JSON.stringify(lastPageParam, null , 2),'from next page query params');
    return nextPage;
  },
});

};

