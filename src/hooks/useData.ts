import { useState, useEffect, useCallback } from 'react';
import {
  API_KEY, BASE_URL, IMG_URL, LANGUAGE, YT_URL,
} from '../constants';
import { MovieType, StreamProviderResultType } from '../types';

const useData = (urlParams?: string, genreId?: number | null) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<MovieType>>([]);
  const [search, setSearch] = useState({ type: 'movie', term: '' });
  const [currentMovieId, setCurrentMovieId] = useState<number | undefined | null>(null);
  const currentMovie = currentMovieId && data.length > 0
    ? data.find((item: MovieType) => item.id === currentMovieId)
    : null;
  const searchUrl = `${BASE_URL}/search/${search.type}?api_key=${API_KEY}${LANGUAGE}&page=1&query=${search.term}&include_adult=false`;
  const media = currentMovie?.media_type ? currentMovie?.media_type : 'movie';
  const getTrailerUrl: string = `${BASE_URL}/${media}/${currentMovieId}/videos?api_key=${API_KEY}${LANGUAGE}`;
  const getStreamProviderUrl: string = `${BASE_URL}/${media}/${currentMovieId}/watch/providers?api_key=${API_KEY}`;

  const fetchData = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const { results } = await response.json();
      setData(results);
      // const filteredMovies = data.filter(
      //   (item: MovieType) => item.genre_ids.includes(genreId),
      // );
      // // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      // currentMovieId && setData(filteredMovies);
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [genreId]);

  useEffect(() => {
    if (search.term) {
      fetchData(searchUrl);
    } else {
      fetchData(`${BASE_URL}${urlParams}?api_key=${API_KEY}${LANGUAGE}`);
    }
  }, [urlParams, search.term, fetchData, searchUrl]);
  useEffect(() => {
    const fetchExtraDetails = async () => {
      //  GET TRAILER FOR CURRENT MOVIE
      const getTrailerKey = await fetch(getTrailerUrl);
      const getStreamProvider = await fetch(getStreamProviderUrl);
      const {
        results: getTrailerKeyResults,
      }: { results: Array<{ site: string, key: string }> } = await getTrailerKey.json();
      const trailerKey: string | undefined = getTrailerKeyResults.find(
        (item: { site: string, key: string }) => item.site === 'YouTube',
      )?.key;
      const trailerUrl: string = currentMovieId ? `${YT_URL}${trailerKey}` : '';

      //  GET STREAM PROVIDER FOR CURRENT MOVIE
      const {
        results: getStreamProviderResults,
      }: { results: StreamProviderResultType } = await getStreamProvider.json();
      const streamProviderLogo = (getStreamProviderResults?.US?.buy
        && getStreamProviderResults?.US?.buy[0].logo_path)
        || getStreamProviderResults?.US?.flatrate[0].logo_path
        || getStreamProviderResults?.MX?.flatrate[0].logo_path
        || getStreamProviderResults?.GB?.flatrate[0].logo_path;
      const streamProvider = streamProviderLogo ? `${IMG_URL}${streamProviderLogo}` : '';
      const item = {
        ...data.find((dataItem) => dataItem.id === currentMovieId),
        streamProvider,
        trailerUrl,
      };
      const additionalInfo: MovieType[] = data.map((dataItem) => (dataItem.id === currentMovieId
        ? { ...dataItem, ...item }
        : dataItem));
      setData(additionalInfo);
    };
    if (currentMovieId) {
      fetchExtraDetails();
    }
  }, [currentMovieId]);
  return {
    loading, data, search, currentMovieId, setSearch, setData, setCurrentMovieId,
  };
};

export default useData;
