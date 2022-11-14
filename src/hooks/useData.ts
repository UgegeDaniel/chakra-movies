/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState, useEffect, useCallback } from 'react';
import {
  API_KEY, BASE_URL, IMG_URL, LANGUAGE, YT_URL,
} from '../constants';
import { MovieType, StreamProviderResultType } from '../types';
import { getLogo, getKey } from '../utils';

const useData = (urlParams: string, genreId?: number | null) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<MovieType>>([]);
  const [search, setSearch] = useState({ type: 'movie', term: '' });
  const [currentMovieId, setCurrentMovieId] = useState<number | null>(null);
  const currentMovie = currentMovieId && data.length > 0
    ? data.find((item: MovieType) => item.id === currentMovieId)
    : null;
  const fetchDataUrl = `${BASE_URL}${urlParams}?api_key=${API_KEY}${LANGUAGE}`;
  const searchUrl = `${BASE_URL}/search/${search.type}?api_key=${API_KEY}${LANGUAGE}&page=1&query=${search.term}&include_adult=false`;
  const media = currentMovie?.media_type ? currentMovie?.media_type : 'movie';
  const getTrailerUrl = `${BASE_URL}/${media}/${currentMovieId}/videos?api_key=${API_KEY}${LANGUAGE}`;
  const getStreamProviderUrl = `${BASE_URL}/${media}/${currentMovieId}/watch/providers?api_key=${API_KEY}`;

  // GET ALL MOVIES DATA
  const fetchData = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { results }: { results: Array<MovieType> } = await response.json();
      setData(results);
      setLoading(false);
      const filteredMovies = data.filter(
        (item: MovieType) => item.genre_ids.includes(genreId),
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      if (genreId) {
        setData(results);
        setData(filteredMovies);
      } else {
        setData(results);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);

  // ADD ADDITIONAL DATA ON REQUEST
  useEffect(() => {
    const fetchExtraDetails = async () => {
      //  GET TRAILER FOR CURRENT MOVIE
      const getTrailerKey = await fetch(getTrailerUrl);
      const getStreamProvider = await fetch(getStreamProviderUrl);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { results: getTrailerKeyResults }: {
        results: Array<{ type: string, key: string }>
      } = await getTrailerKey.json();
      const trailerKey: string | undefined = getKey(getTrailerKeyResults);
      const trailerUrl: string = currentMovieId ? `${YT_URL}${trailerKey}` : '';
      //  GET STREAM PROVIDER FOR CURRENT MOVIE
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { results: getStreamProviderResults }: {
        results: StreamProviderResultType
      } = await getStreamProvider.json();
      const streamProviderLogo = getLogo(getStreamProviderResults);
      const streamProvider = streamProviderLogo ? `${IMG_URL}${streamProviderLogo}` : '';
      const item = {
        ...data.find((dataItem) => dataItem.id === currentMovieId),
        streamProvider,
        trailerUrl,
      };
      // ADD CORRESPONDING ITEM TO MOVIES ARRAY
      const additionalInfo: MovieType[] = data.map((dataItem) => (dataItem.id === currentMovieId
        ? { ...dataItem, ...item }
        : dataItem));
      setData(additionalInfo);
    };
    if (currentMovieId) {
      fetchExtraDetails();
    }
  }, [currentMovieId]);

  // SEARCH MOVIE BY NAME
  useEffect(() => {
    if (search.term) {
      fetchData(searchUrl);
    } else {
      fetchData(fetchDataUrl);
    }
  }, [urlParams, search.term]);
  return {
    loading, data, search, currentMovieId, setSearch, setData, setCurrentMovieId,
  };
};

export default useData;
