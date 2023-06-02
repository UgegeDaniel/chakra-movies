/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';
import { Box, Image, useDisclosure } from '@chakra-ui/react';
import { MovieCardProps } from '../types';
import logo from '../assets/download.png';
import { DetailsModal } from '.';
import { API_KEY, BASE_URL, IMG_URL, LANGUAGE } from '../constants';
import { getLogo } from '../utils';

const MovieCard: React.FC<MovieCardProps> = function ({
  movie, genres
}): JSX.Element {
  const {
    isOpen, onOpen, onClose,
  } = useDisclosure();

  const [currentMovieId, setCurrentMovieId] = useState<string | number>('');
  const getDetails = () => {
    setCurrentMovieId(movie.id);
    onOpen();
  };

  return (
    <Box p="6">
      <Box tabIndex={-1} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={getDetails}>
        <Image
          src={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : logo}
          alt="movie poster"
          height={200}
          width="100%"
          borderRadius="full"
          className="poster"
        />
      </Box>
      <DetailsModal
        movie={movie}
        isOpen={isOpen}
        onClose={onClose}
        genres={genres}
        currentMovieId={currentMovieId}
      />
    </Box>
  );
};
export default MovieCard;
