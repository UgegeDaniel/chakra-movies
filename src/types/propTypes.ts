import {
  MovieType, GenresType,
  SearchType, SetSearchType, SetGenreIdType,
  GenreIdType, SetMovieIdType, SetShowVideoType,
} from './types';

export interface MovieCardProps {
  item: MovieType;
  genres: GenresType;
  setCurrentMovieId: SetMovieIdType;
  setShowVideo: SetShowVideoType;
}
export interface VideoProps {
  onClose: () => void;
  isOpen: boolean;
  onOpen: () => void;
  currentMovie?: MovieType;
  setShowVideo: SetShowVideoType;
}
export interface HeaderProps {
  search: SearchType;
  setSearch: SetSearchType;
  genres: GenresType;
  setGenreId: SetGenreIdType;
  genreId: GenreIdType;
}
export interface SearchProps {
  search: SearchType;
  setSearch: SetSearchType;
}
export interface GenreProps {
  genreId: GenreIdType;
  setGenreId: SetGenreIdType;
  genres: GenresType;
}
export interface DetailsHeaderProps {
  item: MovieType;
  genres: GenresType;
  setShowVideo: SetShowVideoType;
}
export interface DetailsProps {
  item: MovieType;
  isOpen: boolean;
  onClose: () => void;
  genres: GenresType;
  setShowVideo: SetShowVideoType;
}

// export interface ItemProps {
//   item: MovieType
// }
