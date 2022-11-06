import { useState, useEffect } from 'react';
import { API_KEY, BASE_URL, LANGUAGE } from '../constants';

const useGenres = () => {
  const [genres, setGenres] = useState<Array<{ name: string; id: number }>>([]);
  const fetchGenres = async (url: string) => {
    try {
      const response = await fetch(url);
      const { genres: genreData } = await response.json();
      setGenres(genreData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  useEffect(() => {
    fetchGenres(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}${LANGUAGE}`);
  }, []);
  return { genres };
};
export default useGenres;
