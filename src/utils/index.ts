import {
  GenreIdsType, GenresType,
  StreamProviderResultType,
} from '../types';

export const getGenres = (
  genreIds: GenreIdsType,
  genres: GenresType,
) => {
  const genreNames = genres.filter(
    (genre) => genreIds.includes(genre.id),
  ).map((genre) => genre.name);
  return Array.from(new Set (genreNames));
};

export const debounce = (
  debounceFxn: (e: React.ChangeEvent<HTMLInputElement>) => void,
) => {
  let timer: string | number | NodeJS.Timeout | undefined;
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      debounceFxn(e);
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

