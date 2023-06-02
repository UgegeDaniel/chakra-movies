import {
  MovieType, GenresType,
  SearchType, SetSearchType, SetGenreIdType,
  GenreIdType, SetMovieIdType, SetShowVideoType,
} from './types';

export interface MovieCardProps {
  movie: MovieType;
  genres: GenresType;
}
export interface VideoProps {
  trailerUrl?: string;
  setShowVideo: SetShowVideoType;
}
export interface HeaderProps {
  search: SearchType;
  setSearch: SetSearchType;
  genres: GenresType;
  setGenreId: SetGenreIdType;
  genreId: GenreIdType;
}
export interface FilterProps {
  setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface GenreFilterProps extends FilterProps {
  genres: GenresType;
}

export interface AppHeaderProps extends FilterProps {
  genres: GenresType;
}
export interface GenreProps {
  genreId: GenreIdType;
  setGenreId: SetGenreIdType;
  genres: GenresType;
}
export interface DetailsHeaderProps {
  movie: MovieType;
  genres: GenresType;
  currentMovieId: number | string;
}
export interface DetailsProps {
  movie: MovieType;
  isOpen: boolean;
  onClose: () => void;
  genres: GenresType;
  currentMovieId: number | string;
}

