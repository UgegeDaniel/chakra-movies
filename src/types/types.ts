export type GenreIdType = number | null | undefined;
export type SetGenreIdType = React.Dispatch<React.SetStateAction<GenreIdType | undefined>>;

export type GenreIdsType = Array<GenreIdType | undefined>;
// defines the type for the array of genre ids
export type GenreType = { name: string; id: GenreIdType };
export type GenresType = GenreType[];

export type SearchType = { type: string, term: string };
export type SetSearchType = React.Dispatch<React.SetStateAction<SearchType>>;
export type SetMovieIdType = React.Dispatch<React.SetStateAction<number | null | undefined>>;

export type StreamProviderResultType = {
  US?: { flatrate: [{ logo_path: string }], buy: [{ logo_path: string }] },
  MX?: { flatrate: [{ logo_path: string }], buy: [{ logo_path: string }] },
  GB?: { flatrate: [{ logo_path: string }] }
};

export type MovieType = {
  title?: string;
  name?: string;
  vote_average?: number;
  release_date?: string;
  vote_count?: number;
  poster_path?: string;
  media_type?: string;
  backdrop_path: string;
  overview?: string;
  genre_ids: GenreIdsType;
  streamProvider: string;
  trailerUrl: string;
  id: number | string;
};

export type SetShowVideoType = React.Dispatch<React.SetStateAction<boolean>>;
