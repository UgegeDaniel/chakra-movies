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
  genre_ids: Array<number>;
  streamProvider: string;
  trailerUrl: string;
  id: number;
};
export type item = {
  id?: number;
  media_type?: string;
  urls?: Array<object>;
  logo_path?: string;
  type?: string
}
export type genreType = {
  name: string;
  id: number
};

export interface Props {
  item: movie;
  getGenres: (genreIds: Array<number>) => any[];
  genres: object[];
  setTrailer: React.Dispatch<React.SetStateAction<{
    show: boolean;
    url: string;
  }>>
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
}

export interface ItemProps {
  item: movie;
}