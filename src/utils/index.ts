import {
  SetDataType, SetUrlParamsType, GenreIdsType, GenresType,
  StreamProviderResultType,
} from '../types';

export const newUrlParams = (
  newParam: string,
  setData: SetDataType,
  setUrlParams: SetUrlParamsType,
) => {
  setData([]);
  setUrlParams(newParam);
};

export const getGenres = (
  genreIds: GenreIdsType,
  genres: GenresType,
) => {
  const genreNames = genres.filter(
    (genre) => genreIds.includes(genre.id),
  ).map((genre) => genre.name);
  return genreNames;
};

export const debounce = (
  debounceFxn: (e: any) => void,
) => {
  let timer: any;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      debounceFxn([...args]);
    }, 2000);
  };
};

export const getLogo = (getStreamProviderResults: StreamProviderResultType) => (
  (getStreamProviderResults?.US?.buy
    && getStreamProviderResults?.US?.buy[0].logo_path)
  || getStreamProviderResults?.US?.flatrate[0].logo_path
  || getStreamProviderResults?.MX?.flatrate[0].logo_path
  || getStreamProviderResults?.MX?.buy[0].logo_path
  || getStreamProviderResults?.GB?.flatrate[0].logo_path
);

export const getKey = (getTrailerKeyResults: Array<{ type: string, key: string }>) => (
  getTrailerKeyResults.find(
    (item: { type: string, key: string }) => item.type === 'Trailer',
  )?.key
);
