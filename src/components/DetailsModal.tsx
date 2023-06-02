/* eslint-disable func-names */
import React from 'react';
import {
  Box, Text, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { DetailsProps } from '../types';
import { IMG_URL } from '../constants';
import { DetailsModalHeader } from '.';

const DetailsModal: React.FC<DetailsProps> = function ({
  movie, isOpen, onClose, genres, currentMovieId
}): JSX.Element {
  return (
    <div style={{ maxHeight: '80vh', margin: 'auto', overflow: 'hidden' }}>
      <Modal onClose={onClose} size="2xl" blockScrollOnMount={false} isOpen={isOpen}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent height='80%'>
          <DetailsModalHeader movie={movie} genres={genres} currentMovieId={currentMovieId} />
          <ModalCloseButton colorScheme="teal" mr={3} onClick={onClose} />
          <ModalBody>
            <Box
              backgroundImage={`url(${IMG_URL}${movie?.backdrop_path})`}
              bgSize='100%'
              bgPosition='center'
              bgRepeat='no-repeat'
              height='100%'
            >
                {' '}
                <Text pt={10} fontSize="14px" color="whiteAlpha.900" maxW='50%' m='auto' align='center'>
                  {' '}
                  {movie.overview}
                </Text>
                {' '}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default DetailsModal;
