/* eslint-disable func-names */
import React from 'react';
import { Box, Tag, TagLabel } from '@chakra-ui/react';
import { GenreProps } from '../types';

const GenreFilter:
React.FC<GenreProps> = function ({ genreId, setGenreId, genres }): JSX.Element {
  const resetGenres = (id: number | null | undefined): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !id ? setGenreId(null) : setGenreId(id);
  };
  return (
    <Box
      p={1.5}
    >
      <div
        className="genre-carousel"
      >
        <Tag
          size="lg"
          colorScheme={genreId === null
            ? 'red'
            : 'green'}
          borderRadius="full"
          className="genre"
        >
          <TagLabel
            onClick={() => resetGenres(null)}
            fontSize="xs"
          >
            All
          </TagLabel>
        </Tag>
        {genres.map((item) => (
          <Tag
            size="lg"
            colorScheme={genreId === item.id ? 'red' : 'green'}
            borderRadius="full"
            key={item.id}
            fontSize="xs"
            className="genre"
          >
            <TagLabel
              onClick={() => resetGenres(item.id)}
            >
              {item.name}
            </TagLabel>
          </Tag>
        ))}
      </div>
    </Box>
  );
};
export default GenreFilter;
