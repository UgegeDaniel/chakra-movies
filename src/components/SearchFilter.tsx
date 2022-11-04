import {useCallback} from 'react'
import { Box, HStack, Button, IconButton, FormControl, Input, Menu, MenuButton, MenuList, MenuItem, } from '@chakra-ui/react'
import { FaSearch, FaChevronDown } from 'react-icons/fa'
import { SearchProps } from '../types'
import { debounce } from '../utils'

const SearchFilter: React.FC<SearchProps> = ({ search, setSearch }) => {
    const handleChange = (event: any) => {
        setSearch({ ...search, term: event?.target?.value })
    }
    const optimisedSearch = useCallback(debounce(handleChange), [])
    return (
        <FormControl>
            <HStack w='md' marginLeft="1.2rem" marginRight="1.2rem">
                <IconButton colorScheme='teal' aria-label='Search movies' icon={<FaSearch />} size="sm"/>
                <Input type='text' onChange={optimisedSearch} placeholder="Search Chakra Movies" fontSize="xs" size="sm" maxW="sm"/>
                <Box m={2}>
                    <Menu>
                        <MenuButton  py={1} transition='all 0.2s' borderRadius='sm' borderWidth='1px' _hover={{ bg: 'teal.400' }} _expanded={{ bg: 'teal.500' }} _focus={{ boxShadow: 'outline' }} as={Button} rightIcon={<FaChevronDown color='teal' fontSize="xs"/>} variant='soft-rounded' fontSize="xs">
                            {search.type.toUpperCase()}
                        </MenuButton>
                        <MenuList >
                            <MenuItem onClick={() => setSearch({ ...search, type: 'movie' })} fontSize="xs">MOVIES </MenuItem>
                            <MenuItem onClick={() => setSearch({ ...search, type: 'tv' })} fontSize="xs">TV SHOWS</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </HStack>
        </FormControl>
    )
}
export default SearchFilter