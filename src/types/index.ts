export type movie = {
  title?: string;
  name?: string;
  vote_average?: number;
  release_date?: string;
  vote_count?: number;
  poster_path?: string;
  media_type?: string;
  backdrop_path?: string;
  overview?: string;
  genre_ids: Array<number | null | undefined>;
  streamProvider: string;
  trailerUrl: string;
  id: number;
};
export type item  = {
  id?: number;
  media_type?: string;
  urls?: Array<{logo_path: string}>;
  type?: string;
  streamProvider?: string;
  trailerUrl?: string;
  genre_ids?: Array<number | null | undefined>;
}

export type genreType = {
  name: string;
  id: Array<number | null | undefined>
};

export interface MovieCardProps {
  item: movie;
  setTrailer: React.Dispatch<React.SetStateAction<{
    show: boolean;
    url: string;
  }>>;
  genres: { name: string; id: number; }[]
}

export interface VideoProps {
  trailer: { show: boolean; url: string }
  onClose: () => void;
  isOpen: boolean;
  onOpen: () => void;
  setTrailer: React.Dispatch<React.SetStateAction<{
    show: boolean;
    url: string;
  }>>
}
export interface HeaderProps {
  search: { type: string, term: string };
  setSearch: React.Dispatch<React.SetStateAction<{
    type: string;
    term: string;
  }>>;
  genres: Array<{ name: string, id:number }>;
  setGenreId: React.Dispatch<React.SetStateAction<number | null>>;
  genreId: number | null
}
export interface SearchProps {
  search: { type: string, term: string };
  setSearch: React.Dispatch<React.SetStateAction<{
    type: string;
    term: string;
  }>>;
}
//  genreId, setGenreId, genres
export interface GenreProps {
  genreId: number | null;
  setGenreId: React.Dispatch<React.SetStateAction<number | null>>;
  genres:  Array<{ name: string, id:number }>;
}
export interface DetailsHeaderProps {
  item: movie;
  genres: { name: string; id: number; }[];
  setTrailer: React.Dispatch<React.SetStateAction<{
    show: boolean;
    url: string;
  }>>;
}
export interface DetailsProps {
  item: movie;
  isOpen: boolean;
  onClose: () => void;
  genres: { name: string; id: number; }[];
  setTrailer: React.Dispatch<React.SetStateAction<{
    show: boolean;
    url: string;
  }>>;
}

export interface ItemProps {
  item: movie
}