/* eslint-disable func-names */
import React from 'react';
import { Box, Image, useDisclosure } from '@chakra-ui/react';
import { MovieCardProps } from '../types';
import logo from '../assets/download.png';
import DetailsModal from './DetailsModal';
import { IMG_URL } from '../constants';

const MovieCard: React.FC<MovieCardProps> = function ({
  item, genres, setCurrentMovieId, setShowVideo,
}): JSX.Element {
  const {
    isOpen, onOpen, onClose,
  } = useDisclosure();
  const getDetails = () => {
    setCurrentMovieId(item.id);
    onOpen();
  };
  return (
    <Box p="6">
      <Box tabIndex={-1} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={getDetails}>
        <Image
          src={item.poster_path ? `${IMG_URL}${item.poster_path}` : logo}
          alt="movie poster"
          height={200}
          width="100%"
          borderRadius="full"
          className="poster"
        />
      </Box>
      <DetailsModal
        item={item}
        isOpen={isOpen}
        onClose={onClose}
        genres={genres}
        setShowVideo={setShowVideo}
      />
    </Box>
  );
};
export default MovieCard;
