import {
  SetDataType, SetUrlParamsType, GenreIdsType, GenresType,
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
