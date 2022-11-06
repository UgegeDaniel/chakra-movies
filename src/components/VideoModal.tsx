/* eslint-disable func-names */
import React from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { VideoProps } from '../types';

const VideoModal: React.FC<VideoProps> = function ({
  currentMovie, onClose, setShowVideo,
}): JSX.Element {
  return (
    <div>
      <Modal
        isOpen
        size="2xl"
        blockScrollOnMount={false}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent width="90vw" height="60vh">
          <ModalCloseButton
            bg="#FF0000"
            color="white"
            onClick={() => setShowVideo(false)}
          />
          <ModalBody>
            <iframe
              width="100%"
              height="100%"
              src={currentMovie?.trailerUrl}
              title="movie trailer"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default VideoModal;
