import { Box, VStack, HStack, Image, Spacer, Heading, Highlight, Tag, TagLabel } from '@chakra-ui/react'
import logo from "../assets/download.png"
import SearchFilter from './SearchFilter'
import { HeaderProps } from '../types'

const AppHeader: React.FC<HeaderProps> = ({ search, setSearch, genres }) => {
    return (
        <div>
            <VStack justifyContent="space-between" alignItems='center'>
                <HStack p='2' minWidth='max-content'>
                    <Image src={logo} borderRadius='full' boxSize='50px' />
                    <Heading size='md' mb={4} fontSize='35px' as='h1' color='teal.500'>
                        <HStack><Highlight query='Movies' styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }} >Chakra Movies</Highlight></HStack>
                    </Heading>
                </HStack> <Spacer />
                <SearchFilter setSearch={setSearch} search={search} />
            </VStack>
            <Box m={4}>
                <div className="genre-carousel">
                    {genres.map((item, index) => (<Tag size='lg' colorScheme='teal' borderRadius='full' key={index} className="genre"> <TagLabel>{item.name}</TagLabel> </Tag>))}
                </div>
            </Box>
        </div>
    )
}
export default AppHeader