import { useRef } from 'react'
import { Box, HStack, Text, Image, Circle, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, VStack, Avatar, Badge } from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import { PlotProps } from '../types'
import { IMG_URL, } from '../constants'
import logo from "../assets/download.png"

const PlotModal: React.FC<PlotProps> = ({ item, isOpen, onClose, getGenres, genres, setTrailer }) => {
  const finalRef = useRef(null)
  return (
    <div>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} s> <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.title || item.name}
            <HStack alignItems='center' mb="2">
              <HStack>
                <Badge borderRadius='full' px='2' colorScheme='teal' fontSize='10px'> {item.media_type}</Badge>
                <Avatar src={item.streamProvider ? item.streamProvider : logo} name="provider" size="sm" />
              </HStack>
              <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='8px' textTransform='uppercase' ml='1' alignItems="center">
                {getGenres(item.genre_ids, genres).map((genre, index) => { return (<span key={index}>{genre} &bull;</span>) })}
              </Box>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <Image src={`${IMG_URL}${item.backdrop_path}`} alt="backdrop path" />
            <Box p={5} shadow='md' borderWidth='1px'> <Text mt={4}>{item.overview}</Text> </Box>
          </ModalBody>
          <ModalFooter>
            <HStack justifyContent="space-between">
              <HStack justifyContent="space-between">
                <Circle size='30px' bg='#FF0000' color='white' cursor="pointer" onClick={() => setTrailer({ show: true, url: item.trailerUrl })}> <FaPlay fontSize={'12px'} /> </Circle>
                <Circle size='30px' bg='teal.700' color='white' mt={4} fontSize={'12px'} cursor="pointer">  Plot </Circle>
                <Button colorScheme='teal' mr={3} onClick={onClose}>  Close </Button>
              </HStack>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
export default PlotModal