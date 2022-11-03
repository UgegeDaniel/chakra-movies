import { Box, HStack, Circle, ModalHeader, Avatar, Badge } from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import logo from "../assets/download.png"
import { DetailsHeaderProps } from '../types'
import { getGenres } from '../utils'

const DetailsModalHeader: React.FC<DetailsHeaderProps> = ({ item, setTrailer, genres }) => {
    return (
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
    )
}
export default DetailsModalHeader