/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from 'react';
import { API_KEY, BASE_URL, LANGUAGE } from '../constants';

type GenreType = { name: string; id: number };

const useGenres = () => {
  const [genres, setGenres] = useState<GenreType[]>([]);
  const fetchGenres = async (url: string) => {
    try {
      const response = await fetch(url);
      const { genres: genreData }: { genres: GenreType[] } = await response.json();
      setGenres(genreData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchGenres(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}${LANGUAGE}`);
  }, []);
  return { genres };
};
export default useGenres;
