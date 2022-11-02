import { useRef } from 'react'
import { Box, Image, useDisclosure } from '@chakra-ui/react'
import { MovieCardProps } from '../types'
import logo from "../assets/download.png"
import {PlotModal} from '../components'
import { IMG_URL } from '../constants'

const MovieCard: React.FC<MovieCardProps> = ({ item, getGenres, setTrailer, genres }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = useRef(null)
    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' onClick={onOpen}>
            <Box p='6'>
                <Box ref={finalRef} tabIndex={-1}>
                    <Image src={item.poster_path ? `${IMG_URL}${item.poster_path}` : logo} alt="movie poster" height={200} width={"100%"} borderRadius='full' className="poster"/>
                </Box>
                <PlotModal item={item} isOpen={isOpen} onClose={onClose} getGenres={getGenres} genres={genres} setTrailer={setTrailer}/>
            </Box>
        </Box>
    )
}
export default MovieCard