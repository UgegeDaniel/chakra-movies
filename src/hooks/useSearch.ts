import { useCallback, useEffect, useState } from "react";
import { debounce } from "../utils";
import { API_KEY, BASE_URL, LANGUAGE } from "../constants";
import fetchData from "../api";
import { MovieType } from "../types";

const useSearch = (
    setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    ) => {
    const [search, setSearch] = useState({ term: '', type: 'movie' });
    const searchUrl = `${BASE_URL}/search/${search.type}?api_key=${API_KEY}&query=${search.term}`;
    const allMoviesUrl = `${BASE_URL}/trending/all/day?api_key=${API_KEY}${LANGUAGE}`;
    
    const searchMovie = () => {
      const onLoad = () => {
        setLoading(true)
      }
      const onSuccess = (data: { results: MovieType[] }) => {
        setMovies(data.results);
        setLoading(false)
      }
      if (search.term) {
        fetchData(searchUrl, onLoad, onSuccess);
      }
      if (!search.term) {
        fetchData(allMoviesUrl, onLoad, onSuccess);
      }  
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setSearch({ ...search, term: event.target.value });
      searchMovie();
    };

    const optimisedSearch = useCallback(debounce(handleChange), []);
  
    useEffect(() => {
      searchMovie();
    }, [search.term]);

    return { optimisedSearch, search, setSearch };
};

export default useSearch;