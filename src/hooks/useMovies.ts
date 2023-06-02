import { useState, useEffect } from 'react';
import { API_KEY, BASE_URL, LANGUAGE } from "../constants";
import { MovieType } from "../types";
import { GenreType } from '../types/types';
import fetchData from '../api';

const useMovies = () => {
    const [category, setCategory] = useState<string>('/trending/all/day');
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [genres, setGenres] = useState<GenreType[]>([{ name: 'All', id: null }]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const url = `${BASE_URL}${category}?api_key=${API_KEY}${LANGUAGE}`;
      const onLoad = () => {
        setLoading(true)
      }
      const onSuccess = (data: { results: MovieType[] }) => {
        setMovies(data.results);
        setLoading(false)
      }
      fetchData(url, onLoad, onSuccess);
    }, [category]);
  
    useEffect(() => {
      const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}${LANGUAGE}`;
      const onLoad = () => {
        setLoading(true)
      }
      const onSuccess = (data: { genres: GenreType[] }) => {
        setGenres([...genres, ...data.genres]);
        setLoading(false)
      }
      fetchData(url, onLoad, onSuccess);
    }, []);

    return {movies, setMovies, loading, setLoading, genres, setCategory}
}

export default useMovies;