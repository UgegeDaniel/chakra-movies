import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import { VideoProps } from '../types'

const VideoModal: React.FC<VideoProps> = ({trailer, setTrailer, onClose, onOpen, isOpen}) => {
  return (
    <div>
      <Modal onClose={onClose} size="2xl" blockScrollOnMount={false} isOpen>
        <ModalOverlay />
        <ModalContent width="90vw" height="60vh">
          <ModalCloseButton bg='#FF0000' color='white' onClick={()=> setTrailer({show: false, url:''})}/>
          <ModalBody> <iframe width="100%" height="100%" src={trailer.url} title="movie trailer"> </iframe> </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
export default VideoModal