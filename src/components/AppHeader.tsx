import { Box, VStack, HStack, Image, Spacer, Heading, Highlight, Tag, TagLabel } from '@chakra-ui/react'
import logo from "../assets/download.png"
import { SearchFilter } from '../components'
import { HeaderProps } from '../types'
const AppHeader: React.FC<HeaderProps> = ({ search, setSearch, genres, setGenreId, genreId }) => {
    const resetGenres = (id: number | null) => {
        !id ? setGenreId(null) : setGenreId(id)
    }
    return (
        <div>
            <VStack justifyContent="space-between" alignItems='center'>
                <HStack p='2' minWidth='max-content'>
                    <Image src={logo} borderRadius='full' boxSize='50px' />
                    <Heading size='md' mb={4} fontSize='35px' as='h1' color='teal.500'>
                        <HStack>
                            <Highlight query='Movies' styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }} >Chakra Movies</Highlight>
                        </HStack>
                    </Heading>
                </HStack>
                <Spacer />
                <SearchFilter setSearch={setSearch} search={search} />
            </VStack>
            <Box m={4}>
                <div className="genre-carousel">
                    <Tag size="lg" colorScheme={genreId === null ? "red" : "green"} borderRadius="full" className="genre">
                        <TagLabel onClick={() => resetGenres(null)}>All</TagLabel>
                    </Tag>{genres.map((item, index) => (<Tag size='lg' colorScheme={genreId === item.id ? "red" : "green"} borderRadius='full' key={index} className="genre">
                        <TagLabel onClick={() => resetGenres(item.id)}>{item.name}</TagLabel> </Tag>))} </div>
            </Box>
        </div>
    )
}
export default AppHeader