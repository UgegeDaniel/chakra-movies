import { useRef } from 'react'
import { Box, HStack, Text, Image, Circle, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import { PlotProps } from '../types'
import { IMG_URL, } from '../constants'

const PlotModal: React.FC<PlotProps> = ({ item, isOpen, onClose }) => {
  const finalRef = useRef(null)
  return (
    <div>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}> <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.title || item.name}</ModalHeader>
          <ModalBody>
            <Image src={`${IMG_URL}${item.backdrop_path}`} alt="backdrop path" />
            <Box p={5} shadow='md' borderWidth='1px'> <Text mt={4}>{item.overview}</Text> </Box>
          </ModalBody>
          <ModalFooter>
            <HStack justifyContent="space-between">
              <Button colorScheme='teal' mr={3} onClick={onClose}>  Close </Button>
              <Circle size='30px' bg='#FF0000' color='white' cursor="pointer"> <FaPlay fontSize={'12px'} />  </Circle>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
export default PlotModal