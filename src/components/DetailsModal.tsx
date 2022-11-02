import { useRef } from 'react'
import { Box, HStack, Text, Image, Circle, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Avatar, Badge, ModalCloseButton } from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import { PlotProps } from '../types'
import { IMG_URL, } from '../constants'
import logo from "../assets/download.png"

const DetailsModal: React.FC<PlotProps> = ({ item, isOpen, onClose, getGenres, genres, setTrailer }) => {
  const finalRef = useRef(null)
  return (
    <Modal onClose={onClose} size="2xl" blockScrollOnMount={false} isOpen={isOpen}>
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
      <ModalContent>
        <ModalHeader>{item.title || item.name}
          <HStack alignItems='center' mb="2" justifyContent="space-between">
            <HStack >
              <HStack >
                <Badge borderRadius='full' px='2' colorScheme='teal' fontSize='10px'> {item.media_type}</Badge>
                <Avatar src={item.streamProvider ? item.streamProvider : logo} name="provider" size="sm" />
              </HStack>
              <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='8px' textTransform='uppercase' ml='1' alignItems="center">
                {getGenres(item.genre_ids, genres).map((genre, index) => { return (<span key={index}>{genre} &bull;</span>) })}
              </Box>
            </HStack>
            <Circle size='30px' bg='#FF0000' color='white' cursor="pointer" onClick={() => setTrailer({ show: true, url: item.trailerUrl })}> <FaPlay fontSize={'12px'} /> </Circle>
          </HStack>
        </ModalHeader>
        <ModalCloseButton colorScheme='teal' mr={3} onClick={onClose} />
        <ModalBody>
          <Image src={`${IMG_URL}${item.backdrop_path}`} alt="backdrop path" boxSize='100%' maxHeight="250px"/>
          <Box p={5} shadow='md' borderWidth='1px'> <Text mt={4} fontSize='16px'>{item.overview}</Text> </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default DetailsModal