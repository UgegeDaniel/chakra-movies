/* eslint-disable func-names */
import React from 'react';
import {
  VStack, HStack, Image, Spacer, Heading, Highlight,
} from '@chakra-ui/react';
import logo from '../assets/download.png';
import SearchFilter from './SearchFilter';
import GenreFilter from './GenreFilter';
import { HeaderProps } from '../types';

const AppHeader: React.FC<HeaderProps> = function ({
  search, setSearch, genres, setGenreId, genreId,
}): JSX.Element {
  const logoHighlightStyle = {
    px: '2', py: '1', rounded: 'full', bg: 'teal.100', color: 'gray.600',
  };
  return (
    <div>
      <VStack justifyContent="space-between" alignItems="center">
        <HStack p="2" minWidth="max-content">
          <Image src={logo} borderRadius="full" boxSize="50px" />
          <Heading size="md" mb={4} fontSize="35px" as="h1" color="teal.500">
            <HStack>
              <Highlight query="Movies" styles={logoHighlightStyle}>Chakra Movies</Highlight>
            </HStack>
          </Heading>
        </HStack>
        <Spacer />
        <SearchFilter setSearch={setSearch} search={search} />
      </VStack>
      <GenreFilter genreId={genreId} setGenreId={setGenreId} genres={genres} />
    </div>
  );
};
export default AppHeader;
