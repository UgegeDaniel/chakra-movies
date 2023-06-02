import { useEffect, useState } from "react";
import { API_KEY, BASE_URL, LANGUAGE } from "../constants";
import { MovieType } from "../types";
import fetchData from "../api";

const useGenre = (
    setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    ) => {
    const [currentGenreId, setCurrentGenreId] = useState<number | string | null | undefined>(null);

    useEffect(() => {
      const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${currentGenreId}`;
      const allMoviesUrl = `${BASE_URL}/trending/all/day?api_key=${API_KEY}${LANGUAGE}`;
      const onLoad = () => {
        setLoading(true)
      }
      const onSuccess = (data: { results: MovieType[] }) => {
        setMovies(data.results);
        setLoading(false)
      }
      if (!currentGenreId) {
        fetchData(allMoviesUrl, onLoad, onSuccess);
      }
      if (currentGenreId) {
        fetchData(url, onLoad, onSuccess);
      }
    }, [currentGenreId]);

    return { currentGenreId, setCurrentGenreId }
}

export default useGenre;