import React from 'react';
import './app.css';
import {
  Box, CircularProgress, HStack,
  Tabs, TabPanels,
} from '@chakra-ui/react';
import { CATEGORIES } from './constants';
import { AppHeader, Categories, MovieRow } from './components';
import useMovies from './hooks/useMovies';

function App(): JSX.Element {
  const { movies, setMovies, loading, setLoading, genres, setCategory } = useMovies();
  return (
    <Box as="main" p="1rem" w="100vw" h="100vh" overflow="hidden">
      <AppHeader setMovies={setMovies} setLoading={setLoading} genres={genres} />
      <Tabs
        variant="soft-rounded"
        colorScheme={'red' || 'green'}
        isFitted
      >
        <HStack maxWidth="100vw" margin="auto 0.5rem">
          <Categories setCategory={setCategory} />
        </HStack>
        <TabPanels>
          {loading
            ? <CircularProgress isIndeterminate color="teal.300" mt={5} />
            : CATEGORIES.map((category) => (
              <MovieRow key={category.path} movies={movies} genres={genres}/>
            ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
export default App;
