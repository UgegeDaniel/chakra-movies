import React from 'react';
import {
  Box, Button,
  FormControl, HStack,
  IconButton, Input,
  Menu, MenuButton,
  MenuItem, MenuList,
} from '@chakra-ui/react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { FilterProps } from '../types/propTypes';
import useSearch from '../hooks/useSearch';

const SearchFilter: React.FC<FilterProps> = function ({ setMovies, setLoading }): JSX.Element {
  const { optimisedSearch, search, setSearch } = useSearch(setMovies, setLoading);
  return (
    <FormControl>
      <HStack w="md" marginLeft="1.2rem" marginRight="1.2rem">
        <IconButton
          colorScheme="teal"
          aria-label="Search movies"
          icon={<FaSearch />}
          size="sm"
        />
        <Input
          type="text"
          onChange={optimisedSearch}
          placeholder="Search Chakra Movies"
          fontSize="xs"
          size="sm"
          maxW="sm"
        />
        <Box m={2}>
          <Menu>
            <MenuButton
              py={1}
              transition="all 0.2s"
              borderRadius="sm"
              borderWidth="1px"
              _hover={{ bg: 'teal.400' }}
              _expanded={{ bg: 'teal.500' }}
              _focus={{ boxShadow: 'outline' }}
              as={Button}
              rightIcon={(
                <FaChevronDown
                  color="teal"
                  fontSize="xs"
                />
              )}
              variant="soft-rounded"
              fontSize="xs"
            >
              {search.type.toUpperCase()}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => setSearch({ ...search, type: 'movie' })}
                fontSize="xs"
              >
                MOVIES
              </MenuItem>
              <MenuItem
                onClick={() => setSearch({ ...search, type: 'tv' })}
                fontSize="xs"
              >
                TV SHOWS
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </FormControl>
  );
};
export default SearchFilter;
