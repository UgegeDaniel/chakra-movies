import { Box, Image, useDisclosure } from '@chakra-ui/react'
import { MovieCardProps } from '../types'
import logo from "../assets/download.png"
import { DetailsModal } from '../components'
import { IMG_URL } from '../constants'
const MovieCard: React.FC<MovieCardProps> = ({ item, setTrailer, genres }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box p='6'> <Box tabIndex={-1} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' onClick={onOpen}>
            <Image src={item.poster_path ? `${IMG_URL}${item.poster_path}` : logo} alt="movie poster" height={200} width={"100%"} borderRadius='full' className="poster" /> </Box>
            <DetailsModal item={item} isOpen={isOpen} onClose={onClose}  genres={genres} setTrailer={setTrailer} />
        </Box>
    )
}
export default MovieCard