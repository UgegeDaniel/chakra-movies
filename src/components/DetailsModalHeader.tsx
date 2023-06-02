/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';
import {
  Box, HStack, Circle, ModalHeader, Avatar, Badge,
} from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import logo from '../assets/download.png';
import { DetailsHeaderProps } from '../types';
import { getGenres } from '../utils';
import VideoModal from './VideoModal';
import useAdditionalInfo from '../hooks/useAdditionalInfo';

const DetailsModalHeader: React.FC<DetailsHeaderProps> = function (
  { movie, genres },
): JSX.Element {

  const { currentMovie, showVideo, setShowVideo } = useAdditionalInfo(movie);

  return (
    <ModalHeader>
      {showVideo
        && (
          <VideoModal
            trailerUrl={currentMovie.trailerUrl}
            setShowVideo={setShowVideo}
          />
        )}
      <h3>{currentMovie.title || currentMovie.name}</h3>
      <HStack alignItems="center" mb="2" justifyContent="space-between">
        <HStack>
          <HStack>
            <Badge borderRadius="full" px="2" colorScheme="teal" fontSize="10px">
              {' '}
              {currentMovie.media_type}
            </Badge>
            <Avatar src={currentMovie.streamProvider ? currentMovie.streamProvider : logo} name="provider" size="sm" />
          </HStack>
          <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="8px" textTransform="uppercase" ml="1" alignItems="center">
            {getGenres(currentMovie.genre_ids, genres).map((genre) => (
              <span key={genre}>
                {genre}
                {' '}
                &bull;
              </span>
            ))}
          </Box>
        </HStack>
        <Circle size="30px" bg="#FF0000" color="white" cursor="pointer" onClick={() => setShowVideo(true)}>
          {' '}
          <FaPlay fontSize="12px" />
          {' '}
        </Circle>
      </HStack>
    </ModalHeader>
  );
};
export default DetailsModalHeader;
