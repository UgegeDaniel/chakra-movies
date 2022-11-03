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
            <HStack w='md' >
                <IconButton colorScheme='teal' aria-label='Search movies' icon={<FaSearch />} />
                <Input type='text' onChange={optimisedSearch} placeholder="Search Chakra Movies"/>
                <Box m={2}>
                    <Menu>
                        <MenuButton px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'teal.400' }} _expanded={{ bg: 'teal.500' }} _focus={{ boxShadow: 'outline' }} as={Button} rightIcon={<FaChevronDown color='teal' />} variant='soft-rounded'>
                            {search.type.toUpperCase()}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => setSearch({ ...search, type: 'movie' })}>MOVIES </MenuItem>
                            <MenuItem onClick={() => setSearch({ ...search, type: 'tv' })}>TV SHOWS</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </HStack>
        </FormControl>
    )
}
export default SearchFilter