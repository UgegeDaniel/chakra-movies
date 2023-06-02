import React from "react";
import { TabPanel } from "@chakra-ui/react";
import { MovieType } from "../types";
import MovieCard from "./MovieCard";
import { GenreType } from "../types/types";

const MovieRow: React.FC<{key: string | number, movies: MovieType[], genres: GenreType[]}> = ({key, movies, genres}) => (
    <TabPanel key={key}>
    <div className="movie-carousel">
      {' '}
      {
        movies.length > 0 && movies?.map((movie: MovieType) => (
          <div key={movie.id} className="movie-card">
            {' '}
            <MovieCard
              movie={movie}
              genres={genres}
            />
            {' '}
          </div>
        ))}
    </div>
  </TabPanel>
)

export default MovieRow;