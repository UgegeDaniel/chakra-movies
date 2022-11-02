import { useRef } from 'react'
import { Box, VStack, HStack, Image, Badge, Circle, useDisclosure, Avatar } from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import { Props } from '../types'
import logo from "../assets/download.png"
import {PlotModal, MovieCardDetails } from '../components'
import { IMG_URL } from '../constants'

const MovieCard: React.FC<Props> = ({ item, getGenres, setTrailer }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = useRef(null)
    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' minH="28.5em">
            <Box p='6'>
                <Box ref={finalRef} tabIndex={-1}>
                    <VStack alignItems='center' mb="2">
                        <HStack>
                            <Badge borderRadius='full' px='2' colorScheme='teal' fontSize='10px'> {item.media_type}</Badge>
                            <Avatar src={item.streamProvider ? item.streamProvider : logo} name="provider" size="sm" />
                        </HStack>
                        <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='8px' textTransform='uppercase' ml='1' alignItems="center">
                            {getGenres(item.genre_ids).map((genre, index) => { return (<span key={index}>{genre} &bull;</span>) })}
                        </Box>
                    </VStack>
                    <Image src={item.poster_path ? `${IMG_URL}${item.poster_path}` : logo} alt="movie poster" height={200} width={"100%"} borderRadius='full' />
                </Box>
                <HStack justifyContent="space-between">
                    <Circle size='30px' bg='#FF0000' color='white' cursor="pointer" onClick={() => setTrailer({show: true, url: item.trailerUrl})}> <FaPlay fontSize={'12px'} /> </Circle>
                    <Circle size='30px' bg='teal.700' color='white' mt={4} onClick={onOpen} fontSize={'12px'} cursor="pointer">  Plot </Circle>
                </HStack>
                <MovieCardDetails item={item} />
                <PlotModal item={item} isOpen={isOpen} onClose={onClose} />
            </Box>
        </Box>
    )
}
export default MovieCard