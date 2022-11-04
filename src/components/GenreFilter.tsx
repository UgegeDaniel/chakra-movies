import { Box, Tag, TagLabel } from '@chakra-ui/react'
import { GenreProps } from '../types'
const GenreFilter: React.FC<GenreProps> = ({ genreId, setGenreId, genres }) => {
    const resetGenres = (id: number | null) => {
        !id ? setGenreId(null) : setGenreId(id)
    }
    return (
        <Box p={1.5}>
            <div className="genre-carousel">
                <Tag size="lg" colorScheme={genreId === null ? "red" : "green"} borderRadius="full" className="genre">
                    <TagLabel onClick={() => resetGenres(null)} fontSize="xs">All</TagLabel>
                </Tag>{genres.map((item, index) => (<Tag size='lg' colorScheme={genreId === item.id ? "red" : "green"} borderRadius='full' key={index} fontSize="xs" className="genre">
                    <TagLabel onClick={() => resetGenres(item.id)}>{item.name}</TagLabel> </Tag>))}
            </div>
        </Box>
    )
}
export default GenreFilter