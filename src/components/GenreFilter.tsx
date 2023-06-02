/* eslint-disable func-names */
import React from 'react';
import { Box, Tag, TagLabel } from '@chakra-ui/react';
import { GenreFilterProps } from '../types/propTypes';
import useGenre from '../hooks/useGenre';

const GenreFilter: React.FC<GenreFilterProps> = function ({ setMovies, setLoading, genres }): JSX.Element {
  const { currentGenreId, setCurrentGenreId } = useGenre(setMovies, setLoading);
  return (
    <Box
      p={1.5}
    >
      <div
        className="genre-carousel"
      >
        {genres.map((genre) => (
          <Tag
            size="lg"
            colorScheme={currentGenreId === genre.id ? 'red' : 'green'}
            onClick={() => setCurrentGenreId(genre.id)}
            borderRadius="full"
            key={genre.id}
            fontSize="xs"
            className="genre"
            style={{ cursor: 'pointer' }}
          >
            <TagLabel
            >
              {genre.name}
            </TagLabel>
          </Tag>
        ))}
      </div>
    </Box>
  );
};
export default GenreFilter;
