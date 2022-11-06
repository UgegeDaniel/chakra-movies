import React, { useState } from 'react';
import {
  Box, CircularProgress, HStack,
  Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure,
} from '@chakra-ui/react';
import { TABS } from './constants';
import { AppHeader, MovieCard, VideoModal } from './components';
import { MovieType } from './types';
import { newUrlParams } from './utils';
import { useData, useGenres } from './hooks';
import './app.css';

function App(): JSX.Element {
  const [urlParams, setUrlParams] = useState<string>('/trending/all/day');
  const [genreId, setGenreId] = useState<number | null | undefined>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const {
    data, loading, search, currentMovieId, setSearch, setData, setCurrentMovieId,
  } = useData(urlParams, genreId);
  const { genres } = useGenres();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentMovie = data.find((item) => item.id === currentMovieId);
  return (
    <Box as="main" p="1rem" w="100vw" h="100vh" overflow="hidden">
      <AppHeader
        search={search}
        setSearch={setSearch}
        genres={genres}
        setGenreId={setGenreId}
        genreId={genreId}
      />
      {showVideo
        && (
          <VideoModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            currentMovie={currentMovie}
            setShowVideo={setShowVideo}
          />
        )}
      <Tabs
        variant="soft-rounded"
        colorScheme={'red' || 'green'}
        isFitted
      >
        <HStack maxWidth="100vw" margin="auto 0.5rem">
          <TabList>
            {' '}
            {TABS.map((key) => (
              <Tab
                key={key.id}
                onClick={() => newUrlParams(key.param, setData, setUrlParams)}
                fontSize="xs"
              >
                {key.name}
              </Tab>
            ))}
            {' '}
          </TabList>
        </HStack>
        <TabPanels>
          {' '}
          {loading
            ? <CircularProgress isIndeterminate color="teal.300" mt={5} />
            : TABS.map((item) => (
              <TabPanel key={item.id}>
                <div className="movie-carousel">
                  {' '}
                  {data.map((dataItem: MovieType) => (
                    <div key={dataItem.id} className="movie-card">
                      {' '}
                      <MovieCard
                        item={dataItem}
                        genres={genres}
                        setCurrentMovieId={setCurrentMovieId}
                        setShowVideo={setShowVideo}
                      />
                      {' '}
                    </div>
                  ))}
                </div>
              </TabPanel>
            ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
export default App;
