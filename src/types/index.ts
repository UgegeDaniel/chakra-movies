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
  genre_ids: number[];
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
  genre_ids?: number[];
}

export type genreType = {
  name: string;
  id: number
};

export interface MovieCardProps {
  item: movie;
  getGenres: (genreIds: Array<number>, genres: { name: string; id: number; }[]) => string[];
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
  genres: Array<{ name: string }>
}
export interface SearchProps {
  search: { type: string, term: string };
  setSearch: React.Dispatch<React.SetStateAction<{
    type: string;
    term: string;
  }>>;
}
export interface PlotProps {
  item: movie;
  isOpen: boolean;
  onClose: () => void;
  getGenres: (genreIds: Array<number>, genres: { name: string; id: number; }[]) => string[];
  genres: { name: string; id: number; }[];
  setTrailer: React.Dispatch<React.SetStateAction<{
    show: boolean;
    url: string;
  }>>;
}

export interface ItemProps {
  item: movie
}