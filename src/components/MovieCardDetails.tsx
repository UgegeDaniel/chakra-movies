import { Box, VStack, HStack, Text, } from '@chakra-ui/react'
import { ItemProps } from '../types'
import { FaStar } from 'react-icons/fa'
const MovieCardDetails: React.FC<ItemProps> = ({ item }) => {
    return (
        <VStack mt='2' alignItems='center' justifyContent="space-between">
            <Text align="center" mt='1' fontWeight='semibold' as='h4' fontSize='14px' lineHeight='tight' noOfLines={2} color="teal.400"> {item.title || item.name} </Text>
            <Box as='span' color='gray.600' fontSize='xs'>  {item.release_date ? item.release_date : "Coming Soon ..."} </Box>
            <HStack>{item.vote_average && Array(Math.ceil(item.vote_average / 2)).fill('').map((_, i) => (<FaStar key={i} color={i < 0 ? 'teal.500' : 'gray.300'} />))}</HStack>
            <Box as='div' ml='2' color='gray.600' fontSize='sm'> {item.vote_count} reviews </Box>
        </VStack>
    )
}
export default MovieCardDetails