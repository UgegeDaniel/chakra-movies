import { Box, VStack, HStack, Button, IconButton, FormControl, Input, Menu, MenuButton, MenuList, MenuItem, } from '@chakra-ui/react'
import { FaSearch, FaChevronDown } from 'react-icons/fa'
import { SearchProps } from '../types'
const SearchFilter: React.FC<SearchProps> = ({ search, setSearch }) => {
    return (
        <FormControl>
            <VStack justifyContent="center" alignItems='start'>
                <HStack w='md' >
                    <IconButton colorScheme='teal' aria-label='Search movies' icon={<FaSearch />} />
                    <Input type='text' value={search.term} onChange={(e) => setSearch({ ...search, term: e.target.value })} />
                    <Box m={2}>
                        <Menu>
                            <MenuButton px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'teal.400' }} _expanded={{ bg: 'teal.500' }} _focus={{ boxShadow: 'outline' }} as={Button} rightIcon={
                                <FaChevronDown color='teal' />} variant='soft-rounded'> {search.type.toUpperCase()}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => setSearch({ ...search, type: 'movie' })}>MOVIES </MenuItem>
                                <MenuItem onClick={() => setSearch({ ...search, type: 'tv' })}>TV SHOWS</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </HStack>
            </VStack>
        </FormControl>
    )
}
export default SearchFilter