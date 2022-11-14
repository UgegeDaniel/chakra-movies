/* eslint-disable func-names */
import React from 'react';
import {
  Box, Text, Image, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { DetailsProps } from '../types';
import { IMG_URL } from '../constants';
import { DetailsModalHeader } from '.';

const DetailsModal: React.FC<DetailsProps> = function ({
  item, isOpen, onClose, genres, setShowVideo,
}): JSX.Element {
  return (
    <div style={{ maxHeight: '80vh', margin: 'auto', overflow: 'hidden' }}>
      <Modal onClose={onClose} size="2xl" blockScrollOnMount={false} isOpen={isOpen}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <DetailsModalHeader item={item} genres={genres} setShowVideo={setShowVideo} />
          <ModalCloseButton colorScheme="teal" mr={3} onClick={onClose} />
          <ModalBody>
            <Image src={`${IMG_URL}${item?.backdrop_path}`} alt="backdrop path" boxSize="100%" maxHeight="32vh" />
            <Box p={5} shadow="md" borderWidth="1px">
              {' '}
              <Text mt={4} fontSize="14px" height="16vh" padding="4px">
                {' '}
                {item.overview}
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
